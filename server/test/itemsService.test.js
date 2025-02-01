const axios = require('axios');
const itemsService = require('../services/itemsService');

jest.mock('axios');

describe('itemsService', () => {
  describe('fetchItemsByQuery', () => {
    it('Retornando data', async () => {
      axios.get.mockResolvedValue({
        data: {
          results: [
            {
              id: 'MLA123',
              title: 'Producto de prueba',
              price: 100,
              currency_id: 'ARS'
            }
          ],
          filters: [
            {
              id: 'category',
              values: [
                {
                  path_from_root: [
                    { name: 'Categoría Mock' }
                  ]
                }
              ]
            }
          ]
        }
      });
      const data = await itemsService.fetchItemsByQuery('mock');
      expect(data.categories).toEqual(['Categoría Mock']);
      expect(data.items).toHaveLength(1);
      expect(data.items[0].id).toBe('MLA123');
    });
  });
});
