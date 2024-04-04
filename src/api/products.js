import client from './index';

export const productsApi = async() => {
  try {
    const response = await client.get('products')
    return response
  } catch (error) {
    console.log(error.message)
  }
}

export const productApi = async id => {
  try {
    const response = await client.get(`products/${id}`)
    return response
  } catch (error) {
    console.log(error.message)
  }
}


export const updateProductApi = async (productId, userData) => {
  try {
    const response = await client.put(`products/${productId}/favorite`, userData);
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

export const createNewProductApi = async (newProductData) => {
  try {
    const response = await client.post('/products', newProductData);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteProductApi = async (productId) => {
  try {
    const response = await client.delete(`products/${productId}`);
    return response;
  } catch (error) {
    console.error(error.message);
  }
};


