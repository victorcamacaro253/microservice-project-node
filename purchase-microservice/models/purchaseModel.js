import { query } from "../db/db.js";

class purchaseModel {

    static async getComprasDetails(){

        const SQL = `  SELECT 
        c.id_compra, 
        c.fecha, 
        c.total_compra,
        u.id AS id_usuario, 
        u.nombre, 
        u.apellido, 
        u.cedula, 
        u.correo, 
        mp.id_producto, 
        mp.cantidad, 
        mp.precio,
        p.nombre_producto
      FROM 
        productos_compras AS mp 
  
        JOIN productos p ON  mp.id_producto = p.id_producto
      JOIN 
        compras c ON mp.id_compra = c.id_compra 
      JOIN 
        usuario u ON c.id_usuario = u.id 
  
  
   `;
  
   const results= await query(SQL)
  
   return results;
    }


    
static async addCompra(connection,id_usuario,totalCompra){
    const [result]= await connection.query(' INSERT INTO compras (fecha, id_usuario,total_compra) VALUES (NOW(), ?,?)',
            [id_usuario,totalCompra])
      return result.insertId; 

}

 // Agregar productos a la compra
static  async compraProduct(connection, id_compra, productos) {
    const query = 'INSERT INTO productos_compras (id_compra, id_producto, cantidad, precio) VALUES ?';
    const values = productos.map(producto => [id_compra, producto.id_producto, producto.cantidad, producto.precio]);
    await connection.query(query, [values]);
  }

}

export default purchaseModel