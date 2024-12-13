import jwt from 'jsonwebtoken'
/*
const generateToken=(UserId,email,role)=>{
   
  // Generar un token JWT
  const token = jwt.sign(
    { id: UserId,email:email,rol:role},
    process.env.JWT_SECRET, // Asegúrate de tener JWT_SECRET en tus variables de entorno
    { expiresIn: '1h' } // Expiración del token, por ejemplo, 1 hora
);

return token;
}
*/

const generateToken = (UserId,email,role,expiresIn)=>{
  const payload = {id:UserId,email:email,rol:role }

const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });
return token;
}



const verifyToken=(token)=>{
  
  try{

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  return decode; //Retorna el id del usuario 
  }catch(error){
    return null  
  }

}

export default {generateToken,verifyToken }