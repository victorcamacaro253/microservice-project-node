import purchaseService from "../services/purchaseService.js";
class Purchase{

    
static  async getPurchases(req, res){
   
   
    try{
        const purchases = await purchaseService.getAllPurchases();

        res.json(purchases)

    }catch(error){
    console.log(error)
        res.status(500).json({ error: 'Server Error' });
    }
};

static async getPurchasesById(req,res){
    try {
        const purchase = await purchaseService.getPurchaseById(req.params.id);
        if (!purchase) {
            return res.status(404).json({ error: 'Purchase Not found' });
        }
        res.json(purchase);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}


// Agregar un nuevo usuario
static createPurchase = async (req, res) => {
   try {
    const purchase = await purchaseService.createPurchase(req.body);
    res.status(201).json(purchase );
   } catch (error) {
    res.status(500).json({ error: 'Server Error' });
}

   
};



static updatePurchase = async (req, res) => {
   try {
      const updatePurchase = await purchaseService.updatePurchase(req.params.id,req.body)
      if (!updatePurchase ) {
        return res.status(404).json({ error: 'Purchase Not found' });
      }
      res.json(updatePurchase );
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });

        }
};


static deletePurchase = async (req, res) => {
     try {
    const deletePurchase= await purchaseService.deletePurchase(req.params.id)
    if (!deletePurchase ) {
        return res.status(404).json({ error: 'Purchase Not found' });
      }

      res.json({message:'Purchase deleted succesfully'})
 } catch (error) {
    res.status(500).json({ error: 'Server Error' });

 }
};

}

export default Purchase;


