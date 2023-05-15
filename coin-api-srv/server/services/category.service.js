import getDatabase from "../models/config.js";

class categoryService {
  async liste(req, res) {
    try {
      await getDatabase.category
        .findAll()
        .then((response) => res.send({ data: response }));
    } catch (error) {
      res.send("Error: " + error);
    }
  }

}

export default categoryService;

  
