import express,{json} from 'express';
import cors from 'cors';
import routes from './routes/purchaseRoutes.js';


const app = express();

app.use(json())

app.use(cors())

// Rutas
app.use('/purchases', routes);

app.get('/', (req, res) => {
    res.send('Purchase Microservice working');
  });

  // Manejo de errores global
app.use((err, req, res, next) => {
    
    res.status(500).json({ error: 'Error en el servidor' });
  });
  
  export default app;