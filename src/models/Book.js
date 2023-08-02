import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
    {
        id: {
            type: String
        },
        title: {
            type: String,
            required: [
                true,
                'title field is required'
            ]
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'authors',
            required: [
                true,
                'author field is required'
            ]
        },
        publisher: {
            type: String,
            required: [
                true,
                'publisher field is required'
            ],
            enum: {
                values: ['Editora Arqueiro', 'Editora Fracassada'],
                message: 'Publisher {VALUE} not permitted.'
            }
        },
        pages: {
            type: Number,
            validate: {
                validator: (value) => {
                    return value >= 10 && value <= 5000;
                },
                message: 'Number of pages needs to be between 10 and 5000'
            }
        },
    },
    {
        versionKey: false
    }
);

const books = mongoose.model('books', bookSchema);

export default books;