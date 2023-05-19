import getDatabase from '../models/config.js';

class collectionsService {
    async liste(req, res) {
        try {
            await getDatabase.collections.findAll().then((response) => res.send({ data: response }));
        } catch (error) {
            res.send('Error: ' + error);
        }
    }
}

export default collectionsService;
