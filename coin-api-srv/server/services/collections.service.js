import { models } from '../loader/mysql.js';

class collectionsService {
    async liste(req, res) {
        try {
            await models.collections.findAll().then((response) => res.send({ data: response }));
        } catch (error) {
            res.send('Error: ' + error);
        }
    }
}

export default collectionsService;
