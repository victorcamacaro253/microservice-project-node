import userService from '../services/userService.js'

class User{


static async getUserById(req,res){
    const {id} = req.params
    try {
        const users = await userService.getUserById(id);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener el usuario' });
    }
}


}

export default User;


