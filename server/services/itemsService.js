const axios = require('axios');
const BASE_URL = process.env.API_BASE_URL || 'https://api.mercadolibre.com';

function parseItemData(apiItem) {
  
  return {
    id: apiItem.id,
    title: apiItem.title,
    price: {
      currency: apiItem.currency_id,
      amount: Math.floor(apiItem.price),
      decimals: Number((apiItem.price % 1).toFixed(2)) * 100 
    },
    picture: apiItem.thumbnail,
    condition: apiItem.condition,
    free_shipping: apiItem.shipping && apiItem.shipping.free_shipping,
    category_id: apiItem.category_id,
  };
}

async function fetchItemsByQuery(query) {  
  const url = `${BASE_URL}/sites/MLA/search?q=${query}`;
  const { data } = await axios.get(url);

  let categories = [];
  /**
   * La documentación de la API de Búsqueda de MercadoLibre detalla cómo se incluyen 
   * los filtros en la respuesta de la búsqueda.
   * Allí encontramos que cuando la API determina que hay un filtro relevante (por ejemplo, 
   * una categoría aplicable a la consulta), lo incluye en el array filters.
   * En cambio, cuando no se identifica un filtro explícito, se utilizan 
   * los available_filters, que ofrecen información sobre las opciones disponibles 
   * junto con el número de resultados para cada una.
   */
  if (data.filters && data.filters.length > 0) {
    const categoryFilter = data.filters.find(f => f.id === 'category');
    if (categoryFilter && categoryFilter.values && categoryFilter.values.length > 0) {
      categories = categoryFilter.values[0].path_from_root.map(cat => cat.name);
    }
  } else {
    const categoryFilter = data.available_filters.find(f => f.id === 'category');
    if (categoryFilter && categoryFilter.values) {
      const topCategory = categoryFilter.values.reduce((prev, current) => {
        return (prev.results > current.results) ? prev : current;
      });
      categories = [topCategory.name];
    }
  }

  const items = data.results.slice(0, 4).map((result) => parseItemData(result));

  return {
    categories,
    items
  };
}

async function fetchItemById(id) {
  // 1) Traemos la información general del item
  const itemUrl = `${BASE_URL}/items/${id}`;
  // 2) traemos la Descripción
  const descUrl = `${BASE_URL}/items/${id}/description`;

  const [itemRes, descRes] = await Promise.all([
    axios.get(itemUrl),
    axios.get(descUrl)
  ]);

  const itemData = itemRes.data;
  const descriptionData = descRes.data;

  //Aca consultamos el nombre de la categoría del prodcuto actual
  const categoryRes = await axios.get(`${BASE_URL}/categories/${itemData.category_id}`);
 
  const item = {
    id: itemData.id,
    title: itemData.title,
    price: {
      currency: itemData.currency_id,
      amount: Math.floor(itemData.price),
      decimals: Number((itemData.price % 1).toFixed(2)) * 100
    },
    picture: itemData.thumbnail,
    condition: itemData.condition,
    free_shipping: itemData.shipping && itemData.shipping.free_shipping,
    sold_quantity: itemData.sold_quantity,
    description: descriptionData.plain_text,
    category: categoryRes.data && categoryRes.data.name ? categoryRes.data.name : "" ,
  };

  return { item };
}

module.exports = {
  fetchItemsByQuery,
  fetchItemById
};
