import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'the name cannot be blank'],
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Product must belong to a user']
    }

}, {timestamps: true })

productSchema.set('toJSON', {
    transform: (doc, final) => {
      delete final.__v;
    }
  });

const Product = mongoose.model('Product',productSchema)

export default Product