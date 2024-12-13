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

   static async existingProduct(productName) {
        try {
            const results = await query(
                'SELECT nombre_producto FROM productos WHERE nombre_producto = ?',
                [productName]
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
    
    static async getProductStock(id_producto){
        const [result] = await query('SELECT stock FROM productos WHERE id_producto = ?',[id_producto]);
        return result.stock;
    
    }

    
    static async updateProductStock(newStock,id_producto){
    const results = await query('UPDATE productos SET stock =  ? WHERE id_producto=?',[newStock,id_producto]);
    return results;
   }

   
   static async updateTopSelling (id_producto,quantity){
    const SQL = ` Update  productos set vendido = vendido +  ? WHERE id_producto = ?`;

    const results = await query(SQL,[quantity,id_producto]);
     return results;
        
}

}

export default productModel