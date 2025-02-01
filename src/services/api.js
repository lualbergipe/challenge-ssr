const BASE_URL = "http://localhost:3200";

export async function fetchItemsByQuery(search) {
  try {
    const response = await fetch(`${BASE_URL}/api/items?q=${search}`);
    if (!response.ok) {
      throw new Error(`Error fetching items for query "${search}" - ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`[fetchItemsByQuery] ${error.message}`);
    throw error;
  }
}

export async function fetchItemById(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/items/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching item with ID "${id}" - ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`[fetchItemById] ${error.message}`);
    throw error;
  }
}
