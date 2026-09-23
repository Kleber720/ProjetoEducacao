import {Router} from "express";
import categoryController from "../controller/CategoryController";

const routerCategory= Router();

routerCategory.post("/category",categoryController.createCategory);
routerCategory.get("/category/list",categoryController.searchCategory);
routerCategory.get("/category/id",categoryController.searchCategoryById);
routerCategory.get("/category/iduser",categoryController.searchCategoryByIdUser);
routerCategory.delete("/category/delete",categoryController.deleteCategoryById);
routerCategory.put("/category/update",categoryController.updateCategoryById);

export default routerCategory;