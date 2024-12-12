
class Product {

    
static async getProducts(req,res){
   
    try{
        const products = await productService.getAllProducts();

        res.json(products)

    }catch(err){
    
        res.status(500).json({ error: 'Server Error' });
    }

}


static async getProductsById(req,res){

    try{
        const products =  await productService.getProductById(req.params.id) ;
        
        if (!products) {
            return res.status(404).json({ error: 'Product no found' });
        }
        res.json(products)
    }catch(err){
      
        res.status(500).json({ error: 'Server Error' });

    }
}


static async addProduct (req,res){

    try {
        const products= await productService.addProduct(req.body,req.file)

        res.json({message:'Product Inserted Successfully'})
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });

    }
  
}



static async updateProduct (req, res) {
  
    try {

        const updateProduct = await productService.updateProduct(req.params.id,req.body)

        if (!updateProduct ) {
            return res.status(404).json({ error: 'Product not found' });
          }

          res.json({message:'Product Updated Successfully'})
        
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });

    }
};


static async deleteProduct(req,res){

    try {

        const result= await productService.deleteProduct(req.params.id);
        
        if (!result) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({message:'Producto deleted Successfully '});

    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

}

export default Product