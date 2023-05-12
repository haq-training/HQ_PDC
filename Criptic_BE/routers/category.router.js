import { Router } from "express";
import categoryService from "../services/category.service.js";
const service = new categoryService();
const routerCategory = Router();

routerCategory.get("/", (req, res) => {

  return service.liste(req, res);
});

export default routerCategory;
