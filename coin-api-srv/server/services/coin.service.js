import { coinDB } from '../loader/mysql.js';

class coinService {
    async liste(req, res) {
        try {
            await coinDB.coin.findAll().then((response) => res.send({ data: response }));
        } catch (error) {
            res.send('Error: ' + error);
        }
    }
}

export default coinService;
