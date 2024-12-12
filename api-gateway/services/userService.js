import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Asegúrate de instalar dotenv con `npm install dotenv`

// URL del microservicio de usuarios
const userServiceUrl = process.env.USERSERVICEURL;

class Userservice{

    
  // Get all users
  static async getAllUsers() {
    console.log(userServiceUrl)
    try {
        const response = await axios.get(`${userServiceUrl}/users`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching users: ${error.response ? error.response.data : error.message}`);
    }
}

// Obtener un usuario por ID
static async  getUserById(userId) {
    try {
      const response = await axios.get(`${userServiceUrl}/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener el usuario');
    }
  }



    // Create a new user
    static async createUser(userData) {
        try {
            const response = await axios.post(`${userServiceUrl}/users`, userData);
            return response.data;
        } catch (error) {
            throw new Error(`Error creating user: ${error.response ? error.response.data : error.message}`);
        }
    }
  
    // Update a user
    static async updateUser (userId, userData) {
        try {
            const response = await axios.put(`${userServiceUrl}/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating user with ID ${userId}: ${error.response ? error.response.data : error.message}`);
        }
    }

    // Delete a user
    static async deleteUser(userId) {
        try {
            const response = await axios.delete(`${userServiceUrl}/users/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting user with ID ${userId}: ${error.response ? error.response.data : error.message}`);
        }
    }

    static async login (userData) {
        try {
            const response = await axios.post(`${userServiceUrl}/users/login/`, userData);
            return response.data;
        } catch (error) {
            throw new Error(`Error ${error.response ? error.response.data : error.message}`);
        }
    }

}

export default Userservice