import express,{json} from 'express'
import cors from 'cors'
import logger from './utils/logger.js'
import routes from './routes/index.js'

const app = express()


app.use(cors())

app.use(json())

// Rutas
app.use(routes);


app.get('/',(req,res)=>{
    res.send('Api Gateway funcionando')
})


app.use((err,req,res,next)=>{
    logger.error(err)
    res.status(500).json({ error: 'Error en el servidor' });
})

export default app;