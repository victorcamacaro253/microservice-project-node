import app from './app.js';

const PORT = process.env.PORT ?? 3000

app.listen(PORT,()=>{
 
    console.log(`API Gateway corriendo en http://localhost:${PORT}`);

})