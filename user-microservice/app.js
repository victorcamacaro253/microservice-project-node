import express,{json} from 'express';
import cors from 'cors';
import logger from './utils/logger.js';
import routes from './routes/userRoutes.js';


const app = express();

app.use(json())

app.use(cors())

// Rutas
app.use('/users', routes);

app.get('/', (req, res) => {
    res.send('User Microservice funcionando');
  });

  // Manejo de errores global
app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  });
  
  export default app;