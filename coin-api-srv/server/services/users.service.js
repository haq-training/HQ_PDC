import { coinDB } from '../loader/mysql.js';

class usersService {
    async liste(req, res) {
        try {
            await coinDB.users.findAll().then((response) => res.send({ data: response }));
        } catch (error) {
            res.send('Error: ' + error);
        }
    }
}

export default usersService;
