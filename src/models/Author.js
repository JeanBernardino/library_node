import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
    {
        id: {
            type: String
        },
        name: {
            type: String,
            required: [
                true,
                'name field is required'
            ]
        },
        country: {
            type: String
        }
    },
    {
        versionKey: false
    }
);

const authors = mongoose.model('authors', authorSchema);

export default authors;