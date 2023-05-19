import getDatabase from '../models/config.js';

class coinService {
    async liste(req, res) {
        try {
            await getDatabase.coin.findAll().then((response) => res.send({ data: response }));
        } catch (error) {
            res.send('Error: ' + error);
        }
    }
}

export default coinService;
