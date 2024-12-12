import Userservice from '../services/userService.js';


class User{

    
static  async getUsers(req, res){
   
    try {
        const users = await Userservice.getAllUsers();
        

        res.json(users);

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server Error' });
    }
};

static async getUserById(req,res){
    try {
        const user = await Userservice.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User Not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}


// Agregar un nuevo usuario
static async createUser(req, res){
   try {
    const user = await Userservice.createUser(req.body);
    res.status(201).json(user );
   } catch (error) {
    res.status(500).json({ error: 'Server Error' });
}

   
};



static async updateUser(req, res) {
   try {
      const updatedUser = await Userservice.updateUser(req.params.id,req.body)
      if (!updatedUser ) {
        return res.status(404).json({ error: 'User Not found' });
      }
      res.json(updatedUser );
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });

        }
};


static async deleteUser(req, res) {
     try {
    const deleteUser= await Userservice.deleteUser(req.params.id)
    if (!deleteUser ) {
        return res.status(404).json({ error: 'User Not found' });
      }

      res.json({message:'Usuario deleted succesfully'})
 } catch (error) {
    res.status(500).json({ error: 'Server Error' });


 }
};

static async login (res,req){
    try {
        const login = Userservice.login(req.body)
        if (!login) {
            return res.status(401).json({ error: 'Invalid credencials' });
            }
            res.json(login)
        
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });

    }
}


}

export default User;


