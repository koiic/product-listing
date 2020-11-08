
import Product from '../models/product';


class ProductController {

    static async list (req, res, next) {
        let products;
        if (req.user.role == 'admin') {
            products = await Product.find({})
        }
        else {
            products = await Product.find({}).select('-created_by')
        }
        
        if (products) {
           res.status(200).json({status:'success', data:products});
        } else if (error) {
            return res.status(500).json({ error })
        }
    }


    /**
     **_ Function to create the product in product collection.
    _**/
    static async create (req, res, next) {
        const created_by = req.user
        const { name, price, description } = req.body
        try {
            const product = await Product.create({
                name, price, description, created_by 
            })
            
            if (product){
                res.status(201).json({status:'success', data:product});
            } else if (error) {
                res.status(400).json({status:'failed', error:error})
            }
        }catch (error) {
          return res.status(500).json(error);
        }
        
    }

      /**
     **_ Function to get single  product  information in collection.
    _**/
    static async single(req, res) {
        console.log('I got here')
        const { product_id: productId } = req.params;
        try {
            let product;
            if (req.user.role == 'admin') {
                product = await Product.findById({_id : productId})
            }
            else {
                product = await Product.findById({_id : productId}).select('-created_by')
            }
        
            if (product) {
                return res.status(200).json(product);
            }
            return res.status(404).json({
                message: 'Product not found',
                field: 'product id'
            });
        } catch (error) {
          return res.status(500).json(error);
        }
      }


    // /**
    //  **_ Function to update the product data  by their ID.
    // _**/
    static async update (req, res) {
        const { product_id: productId } = req.params;
        try{
            if (!productId) {
                res.status(400).send('Product Id is missing');
                return;
            }

            var updateData = req.body || {}
            const product = await Product.findByIdAndUpdate({_id: productId}, updateData, {new: true})
            if (product){
                return res.status(200).json(product);
            }
            return res.status(404).json({
                message: 'Product not found',
                field: 'product id'
              });
        }
        catch (error) {
            return res.status(500).json(error);
          }
    }

    // /**
    // _ Function to delete the product from collection.
    // */
    static async delete (req, res) {
        const { product_id: productId } = req.params;
        if (!productId) {
            res.status(400).send('Product Id is missing');
            return;
        }

        const docs = await Product.findByIdAndDelete({_id:productId})
        if (!docs){
            return res.status(404).json({
                message: 'Product not found',
                field: 'product id'
              });
        }
        return res.status(200).json({status:"success", message:"product deleted successfully"});
       
    }

}


export default ProductController;