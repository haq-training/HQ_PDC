import bcrypt from "bcrypt";
import { models } from '../loader/mysql.js';

class usersService {
  async liste(req, res) {
    try {
      const response = await models.users.findAll();
      res.send({ data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  register = async (req, res) => {
    try {
      let userName = req.body.userName;
      let userPass = req.body.userPass;
      let token = "";

      // Kiểm tra người dùng đã tồn tại hay chưa
      const userExist = await models.users.findOne({
        where: { userName: userName },
      });
      if (userExist) {
        res.status(400);
        throw new Error("User already exists");
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(userPass, salt);

      await models.users.create({
        userName: userName,
        userPass: hashPassword,
        token: token,
      });

      res.send("created");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  login = async (req, res) => {
    let userName = req.body.userName;
    let userPass = req.body.userPass;

    const userExist = await models.users.findOne({
      where: { userName: userName },
    });
    if (userExist) {
      const validPassword = await bcrypt.compare(
        userPass,
        userExist.dataValues.userPass
      );

      if (validPassword) {
        res.status(200).json({ message: "Valid password" });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  };

  logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.send('Logged out successfully');
      }
    });
  };


}

export default usersService;
