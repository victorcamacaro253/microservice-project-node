import express,{json} from 'express'
import cors from 'cors'
import logger from './utils/logger.js'
import userRoutes from './controllers/userController.js';
import productRoutes from './controllers/productController.js';
import purchaseRoutes from './controllers/purchaseController.js';


const app = express()


app.use(cors())

app.use(json())

// Rutas
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/purchases', purchaseRoutes);

app.get('/',(req,res)=>{
    res.send('Api Gateway funcionando')
})


app.use((err,req,res,next)=>{
    logger.error(err)
    res.status(500).json({ error: 'Error en el servidor' });
})

export default app;