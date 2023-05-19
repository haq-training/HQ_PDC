import getDatabase from '../models/config.js';

class usersService {
    async liste(req, res) {
        try {
            await getDatabase.users.findAll().then((response) => res.send({ data: response }));
        } catch (error) {
            res.send('Error: ' + error);
        }
    }
}

export default usersService;
