import { coinDB } from '../loader/mysql.js';

class transactionService {
    async liste(req, res) {
        try {
            await coinDB.transaction.findAll().then((response) => res.send({ data: response }));
        } catch (error) {
            res.send('Error: ' + error);
        }
    }
}

export default transactionService;
