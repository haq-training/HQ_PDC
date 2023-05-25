import { coinDB } from '../loader/mysql.js';

class conversionService {
    async liste(req, res) {
        try {
            await coinDB.conversion.findAll().then((response) => res.send({ data: response }));
        } catch (error) {
            res.send('Error: ' + error);
        }
    }
}

export default conversionService;
