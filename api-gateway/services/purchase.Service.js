import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Asegúrate de instalar dotenv con `npm install dotenv`

const purchaseServiceUrl = process.env.purchaseServiceUrl; // URL del servicio de productos

class purchaseService{

    
  // Get all users
  static async getAllPurchases() {
    try {
        const response = await axios.get(`${purchaseServiceUrl}/purchases`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching purchases: ${error.response ? error.response.data : error.message}`);
    }
   }

   

static async getPurchaseById(purchaseId){
    try {
        const response = await axios.get(`${purchaseServiceUrl}/purchases/:${purchaseId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching purchases: ${error.response ? error.response.data : error.message}`);
    }

}


static createPurchase = async (purchaseData,purchaseFile)=>{

    try {
        const response = await axios.post(`${purchaseServiceUrl}/purchases/`,purchaseData,purchaseFile);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching purchases: ${error.response ? error.response.data : error.message}`);
    }
  
}



static updatePurchase = async (purchaseId, purchaseData) => {
    try {
        const response = await axios.put(`${purchaseServiceUrl}/purchases/${purchaseId}`, purchaseData);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating purchase with ID ${userId}: ${error.response ? error.response.data : error.message}`);
    }
   
};


static deletePurchase= async (purchaseId) =>{

    try {
        const response = await axios.delete(`${purchaseServiceUrl}/purchases/:${purchaseId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching purchases: ${error.response ? error.response.data : error.message}`);
    }
  
}



}

export default purchaseService