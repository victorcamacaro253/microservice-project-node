import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Asegúrate de instalar dotenv con `npm install dotenv`

const productServiceUrl = process.env.productServiceUrl; // URL del servicio de productos

class productService{

    
  // Get all users
  static async getAllProducts() {
    try {
        const response = await axios.get(`${productServiceUrl}/products`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching products: ${error.response ? error.response.data : error.message}`);
    }
   }

   

static async getProductsById(productId){
    try {
        const response = await axios.get(`${productServiceUrl}/products/:${productId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching products: ${error.response ? error.response.data : error.message}`);
    }

}


static addProduct = async (productData,productFile)=>{

    try {
        const response = await axios.post(`${productServiceUrl}/products/`,productData,productFile);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching products: ${error.response ? error.response.data : error.message}`);
    }
  
}



static updateProduct = async (productId, productData) => {
    try {
        const response = await axios.put(`${productServiceUrl}/products/${productId}`, productData);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating user with ID ${userId}: ${error.response ? error.response.data : error.message}`);
    }
   
};


static deleteProduct= async (productId) =>{

    try {
        const response = await axios.delete(`${productServiceUrl}/products/:${productId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching products: ${error.response ? error.response.data : error.message}`);
    }
  
}



}

export default productService