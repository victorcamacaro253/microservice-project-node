import userModel from "../models/userModel.js";
import { hash, compare } from 'bcrypt';
import tokenService from "../services/tokenService.js";


class UserController {
  static async getUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await userModel.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  }

  static async createUser(req, res) {
    try {
      const user = await userModel.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  }

  static async updateUser(req, res) {
    try {
      const updatedUser = await userModel.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  }

  static async deleteUser(req, res) {
    try {
      const deleted = await userModel.deleteUser(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  }

  /*static async login(req, res) {
    try {
      const login = await userModel.login(req.body);
      if (!login) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.json(login);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  }*/


    static async login(req, res) {
        const { email, password } = req.body;
        console.log(email,password)
    
        // Validación de entrada
        if (!email || !password) {
          return res.status(400).json({ error: 'email & password are required' });
        }
    
        try {
          // Buscar al usuario en la base de datos
          const user = await userModel.findUserByEmail(email);
          console.log(user.contraseña)
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
    
          // Comparar la contraseña proporcionada con la almacenada en la base de datos
          const match = await compare(password, user.contraseña);
          if (!match) {
            return res.status(401).json({ error: 'invalid credentials' });
          }
    
          // Generar tokens
          const token = tokenService.generateToken(user.id, user.correo, user.rol, '1h');
          const refreshToken = tokenService.generateToken(user.id, user.correo, user.rol, '7d');
          const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Expira en 7 días
    
          // Guardar el refresh token en la base de datos
        //  await tokenModel.saveRefreshToken(user.id, refreshToken, expiresAt);
    
          // Configurar el refresh token como una cookie
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // No accesible por JavaScript en el navegador
            secure: process.env.NODE_ENV === 'production', // Solo en producción
            sameSite: 'Strict', // Protección contra CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días en milisegundos
          });
    
          // Generar un código aleatorio para el registro de inicio de sesión
         // const randomCode = randomBytes(8).toString('hex');
    
          // Insertar registro de inicio de sesión en la base de datos
         // await userModel.insertLoginRecord(user.id, randomCode);
    
          // Emitir una notificación a todos los usuarios conectados
          const message = `${user.correo} ha iniciado sesión.`; // Personaliza el mensaje
         // notificationService.notifyClients(message); // Llama a la función de notificación
    
          // Devolver la respuesta con el token
          res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            refreshToken
          });
    
        } catch (error) {
          console.error('Error ejecutando la consulta:', error);
          res.status(500).json({ error: 'Server Error' });
        }
      }
}

export default UserController;
