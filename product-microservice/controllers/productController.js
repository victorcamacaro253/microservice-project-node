import productModel from '../models/productModel.js';

class productController {
    static async getAllProducts(req, res) {
      try {
        const products = await productModel.getAllProducts();
        res.json(products);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
      }
    }
  
    static async getProductById(req, res) {
        const {id}= req.params
        console.log(id)
      try {
        const product = await productModel.getProductById(id);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
      } catch (error) {
        res.status(500).json({ error: 'Server Error' });
      }
    }
  
    static async createProduct(req, res) {
     
    const { nombre_producto, descripcion, precio,stock,id_categoria,estatus = "activo",id_proveedor } = req.body;
    const image = req.file

    if (!nombre_producto || !descripcion || !precio || !stock || !id_categoria) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const precioNum = parseFloat(precio);
    const stockNum = Number(stock, 10);

    if (isNaN(precioNum) || !Number.isFinite(precioNum) || precioNum < 0) {
        return res.status(400).json({ error: 'El precio debe ser un número positivo' });
    }

    if (isNaN(stockNum) || !Number.isInteger(stockNum) || stockNum < 0) {
        return res.status(400).json({ error: 'El stock debe ser un número entero positivo' });
    }

    const codigo = crypto.randomBytes(4).toString('hex').toUpperCase();


    
    // Iniciar transacción
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        // Verificar si el usuario ya existe
        const [existingProduct] = await ProductModel.existingProduct(connection,nombre_producto)
        if (existingProduct.length > 0) {
            await connection.rollback(); // Deshacer la transacción
            return res.status(400).json({ error: 'Producto ya existe' });
        }

        
        // Si se subió una imagen, guarda la ruta de la imagen
        const imagePath = image ? image.path : null;
        

        // Consulta SQL para insertar el iproducto
        const [results] = await productModel.addProduct(connection,codigo,nombre_producto,descripcion, precioNum,stockNum,id_categoria,estatus,id_proveedor,imagePath)

        // Confirmar transacción
        await connection.commit();

        res.status(201).json({ id: results.insertId, nombre_producto });
    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        await connection.rollback(); // Deshacer la transacción en caso de error
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        connection.release(); // Liberar el connection pool
    }

}
    
  
    static async updateProduct(req, res) {
      try {
        const updatedUser = await productModel.updateProduct(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updatedUser);
      } catch (error) {
        res.status(500).json({ error: 'Server Error' });
      }
    }
  
    static async deleteProduct(req, res) {
      try {
        const deleted = await productModel.deleteProduct(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Server Error' });
      }
    }

}
    
export default productController