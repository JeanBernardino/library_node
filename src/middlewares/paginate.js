import ErrorRequest from '../errors/ErrorRequest.js';

async function paginate(req, res, next) {
    try {
        let { limit = 5, page = 1, ordination = '_id:1' } = req.query;
        let [orderField, order] = ordination.split(':');

        limit = parseInt(limit);
        page = parseInt(page);

        const result = req.result;

        if (limit > 0 && page > 0){
            const paginateResult = await result.find()
                .sort({ [orderField]: order})
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();

            res.status(200).json(paginateResult);    
        } else {
            next(new ErrorRequest());
        }
    } catch (error) {
        next(error);
    }
}

export default paginate;