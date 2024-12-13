import {query} from '../db/db.js'; // Configura tu conexión a la base de datos

class userModel {
  static async getAllUsers() {
    return query('SELECT * FROM usuario');
  }

  static async getUserById(id) {
    const [user] = await query('SELECT * FROM usuario WHERE id = ?', [id]);
    return user;
  }

  static async createUser(userData) {
    const { name,apellido,cedula, email, password } = userData;
    const result = await query('INSERT INTO usuario (nombre, apellido, cedula, correo, contraseña) VALUES (?, ?, ?, ?, ?)', [
      name,
      apellido,
      cedula,
      email,
      password,
    ]);
    return { id: result.insertId, ...userData };
  }

  static async updateUser(id, userData) {
    await query('UPDATE usuario SET ? WHERE id = ?', [userData, id]);
    return { id, ...userData };
  }

  static async deleteUser(id) {
    const result = await query('DELETE FROM usuario WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

/*  static async login(credentials) {
    const { email, password } = credentials;
    const [user] = await query('SELECT * FROM usuario WHERE email = ? AND password = ?', [
      email,
      password,
    ]);
    return user;
  }*/

  static async findUserByEmail(email) {
        const [results] = await query('SELECT * FROM usuario WHERE correo = ?', [email]);
        return results;
    }
}

export default userModel;
