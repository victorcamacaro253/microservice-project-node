import purchaseModel from '../models/purchaseModel.js';
import { pool } from '../db/db.js';
import axios from 'axios';

class purchaseController {


    static getCompras = async (req, res) => {
        try {
          const result = await purchaseModel.getComprasDetails();
      
          const compraAgrupada = new Map();
      
          for (const row of result) {
            const { id_compra, fecha, total_compra, id_usuario, nombre, apellido, cedula, correo, id_producto, nombre_producto, cantidad, precio } = row;
      
            if (!compraAgrupada.has(id_compra)) {
              compraAgrupada.set(id_compra, {
                id_compra,
                fecha,
                total: total_compra,
                usuario: {
                  id: id_usuario,
                  nombre,
                  apellido,
                  cedula,
                  correo,
                },
                productos: [],
              });
            }
      
            compraAgrupada.get(id_compra).productos.push({
              id_producto,
              nombre: nombre_producto,
              cantidad,
              precio,
            });
          }
      
          // Convertir a array y enviar como respuesta
          return res.json([...compraAgrupada.values()]);
        } catch (error) {
          console.error('Error ejecutando la consulta', error);
          return res.status(500).json({
            error: 'Error interno del servidor',
            details: error.message,
          });
        }
      };
      
      

      static compraProduct = async (req, res) => {
        const { id_usuario, productos } = req.body;
      
        if (!id_usuario || !productos || !Array.isArray(productos) || productos.length === 0) {
          return res.status(400).json({ error: 'El usuario y al menos un producto son requeridos' });
        }
      
        // Validar productos
        let totalCompra=0
        for (const producto of productos) {
          const { id_producto, cantidad, precio } = producto;
          if (!id_producto || !cantidad || !precio || isNaN(cantidad) || cantidad <= 0 || isNaN(precio) || precio <= 0) {
            return res.status(400).json({ error: 'Datos de producto inválidos' });
          }
          totalCompra += cantidad * precio; // Sumar al total
          
        }
      
        // Iniciar transacción
        const connection = await pool.getConnection();
        await connection.beginTransaction();
      
        try {
          // Verificar stock y preparar datos para inserción
          const insertProductos = [];
          for (const producto of productos) {
            const { id_producto, cantidad, precio } = producto;


           // const stock = await ProductModel.getProductStock(connection, id_producto);
           
        const response = await axios.get(`http://localhost:4002/products/stock/${id_producto}`);
        const productInfo = response.data;

      
            if (productInfo.stock < cantidad) {
              await connection.rollback(); // Deshacer la transacción
              return res.status(400).json({ error: 'Stock insuficiente para el producto con id ' + id_producto });
            }
      
            insertProductos.push(producto);
          }
      
          // Insertar la compra
          const id_compra = await purchaseModel.addCompra(connection, id_usuario,totalCompra);
      
      
          
      
          // Insertar productos en la compra
          await purchaseModel.compraProduct(connection, id_compra, insertProductos);
      
      
          // Actualizar el stock del producto
          for (const producto of insertProductos) {
            const { id_producto, cantidad } = producto;
           // const stock = await ProductModel.getProductStock(connection, id_producto);
           const response = await axios.get(`http://localhost:4002/products/stock/${id_producto}`);
           const productInfo = response.data;
            const newStock = productInfo - cantidad;
                       console.log('newstock',newStock)

          //  await ProductModel.updateProductStock(connection, id_producto, newStock);
          await axios.put(`http://localhost:4002/products/stock/update/${id_producto}`, {
            newStock,
          });
          }
      
          // Confirmar la transacción
          await connection.commit();
 
      
         // Llamar a actualizarProductosMasVendidos fuera de la transacción
      for (const producto of insertProductos) {
        const { id_producto, cantidad } = producto;
        //await ProductModel.updateTopSelling(id_producto, cantidad);
        await axios.put(`http://localhost:4002/products/topSelling/${id_producto}`, {
            cantidad,
          });
      }
      
      
      
          res.status(201).json({ id_compra, message: 'Compra realizada con éxito' });
      
        } catch (err) {
          console.error('Error ejecutando la transacción:', err);
          await connection.rollback(); // Deshacer la transacción en caso de error
          res.status(500).json({ error: 'Error interno del servidor' });
        } finally {
          // Liberar la conexión
          connection.release();
        }
      };
      
      static deleteCompra = async (req, res) => {
        const { id } = req.params;
      
        // Iniciar transacción
        const connection = await pool.getConnection();
        await connection.beginTransaction();
      
        try {
            // Obtener los productos de la compra
            const productosCompras = await comprasModel.getProductosCompras(connection, id);
      
            // Eliminar productos de la base de datos
            for (const producto of productosCompras) {
                const { id_producto,id_compra } = producto; // Asegúrate de que estás usando el campo correcto
               // await comprasModel.deleteProductoCompra(connection, id_producto); // Cambia id_compra por id_producto
               await comprasModel.deleteProductoCompra(connection, id_compra); 
      
            }
      
            // Eliminar la compra de la base de datos
            await comprasModel.deleteCompra(connection, id);
            
            // Confirmar la transacción
            await connection.commit();
            
            res.status(200).json({ message: 'Compra eliminada con éxito' });
        } catch (err) {
            console.error('Error ejecutando la transacción:', err);
            await connection.rollback(); // Deshacer la transacción en caso de error
            res.status(500).json({ error: 'Error interno del servidor' });
        } finally {
            // Liberar la conexión
            connection.release();
        }
      }

      static deleteCompra = async (req, res) => {
  const { id } = req.params;

  // Iniciar transacción
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
      // Obtener los productos de la compra
      const productosCompras = await comprasModel.getProductosCompras(connection, id);

      // Eliminar productos de la base de datos
      for (const producto of productosCompras) {
          const { id_producto,id_compra } = producto; // Asegúrate de que estás usando el campo correcto
         // await comprasModel.deleteProductoCompra(connection, id_producto); // Cambia id_compra por id_producto
         await comprasModel.deleteProductoCompra(connection, id_compra); 

      }

      // Eliminar la compra de la base de datos
      await comprasModel.deleteCompra(connection, id);
      
      // Confirmar la transacción
      await connection.commit();
      
      res.status(200).json({ message: 'Compra eliminada con éxito' });
  } catch (err) {
      console.error('Error ejecutando la transacción:', err);
      await connection.rollback(); // Deshacer la transacción en caso de error
      res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
      // Liberar la conexión
      connection.release();
  }
}

}

export default purchaseController