import { query } from "../db/db.js";

class productModel {
    
   static async getAllProducts() {
        const results= await query('SELECT * FROM productos INNER JOIN categorias ON productos.id_categoria = categorias.id_categoria INNER JOIN proveedor ON productos.id_proveedor = proveedor.id_proveedor');
        return results;
    }

  static  async getProductById(id) {
        const results = await query('SELECT * FROM productos INNER JOIN categorias ON productos.id_categoria = categorias.id_categoria INNER JOIN proveedor ON productos.id_proveedor = proveedor.id_proveedor WHERE id_producto = ?', [id]);
        return results;
    }

   static async existingProduct(nombre_producto) {
        try {
            const results = await query(
                'SELECT nombre_producto FROM productos WHERE nombre_producto = ?',
                [nombre_producto]
            );
            
            // Si el arreglo `results` contiene al menos un resultado, retorna `true`, si no, retorna `false`
            return results.length > 0;
        } catch (error) {
            console.error('Error en la consulta de productos:', error);
            throw new Error('Error en la consulta de productos');
        }
    }

   static async addProduct(codigo, nombre_producto, descripcion, precio, stock, id_categoria, activo, id_proveedor) {
        const results = await query(
            'INSERT INTO productos (codigo, nombre_producto, descripcion, precio, stock, id_categoria, activo, id_proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [codigo, nombre_producto, descripcion, precio, stock, id_categoria, activo, id_proveedor]
        );
        return results;
    }

   static  async deleteProduct(id){
        const result = await query('DELETE FROM productos WHERE id_producto = ?',[id])
        return result.affectedRows;
    }
    
}

export default productModel