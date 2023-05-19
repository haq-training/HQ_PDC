import getDatabase from '../models/config.js';

class conversionService {
    async liste(req, res) {
        try {
            await getDatabase.conversion.findAll().then((response) => res.send({ data: response }));
        } catch (error) {
            res.send('Error: ' + error);
        }
    }
}

export default conversionService;
