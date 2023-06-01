import { models } from '../loader/mysql.js';

class coinService {
    async liste(req, res) {
        try {
            await models.coin.findAll().then((response) => res.send({ data: response }));
        } catch (error) {
            res.send('Error: ' + error);
        }
    }
}

export default coinService;
