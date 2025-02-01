const itemsService = require('../services/itemsService');

// Esta info es requerida en la prueba
const AUTHOR = { name: 'Luis', lastname: 'Giraldo' };

const getItemsByQuery = async (req, res) => {  
  const query = req.query.q || '';
  try {
    const data = await itemsService.fetchItemsByQuery(query);

    //Acá retornamos la respuesta y agregamos los datos del autor
    const response = {
      author: AUTHOR,
      categories: data.categories, 
      items: data.items
    };
    return res.status(200).json(response);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error obteniendo ítems' });
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await itemsService.fetchItemById(id);
        //Acá construimos el objeto y agregamos los datos del autor
    const response = {
      author: AUTHOR,
      item: data.item,
    };
    return res.status(200).json(response);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error obteniendo ítem' });
  }
};

module.exports = {
  getItemsByQuery,
  getItemById
};
