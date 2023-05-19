import getDatabase from '../models/config.js';

class transactionService {
    async liste(req, res) {
        try {
            await getDatabase.transaction.findAll().then((response) => res.send({ data: response }));
        } catch (error) {
            res.send('Error: ' + error);
        }
    }
}

export default transactionService;
