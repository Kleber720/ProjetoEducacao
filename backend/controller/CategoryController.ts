import { createCategoryDTO } from "../models/dto/category/createCategoryDTO";
import categoryServices from "../services/CategoryServices";
import { Response, Request } from "express";


class CategoryController{

    async createCategory(req: Request, res: Response): Promise<any>{
        try{
            const categoryDTO= req.body;
            const category= await categoryServices.createCategory(categoryDTO);
            return res.status(201).json(category);

        }catch(error){
            return res.status(500).json({message: `Error creating user: ${error.message}`})
        }
    }

    async searchCategory(req:Request, res: Response): Promise<any>{
        try{
            const category= await categoryServices.searchCategory(req);
            return res.status(200).json(category)

        }catch(error){
            return res.status(500).json({message: `Error searching a category: ${error.message}`})
        }
    }

    async searchCategoryById(req:Request, res: Response): Promise<any>{
        try{
            const category= await categoryServices.searchCategoryById(req.params.id);
            return res.status(200).json(category);

        }catch(error){
            return res.status(500).json({ message: `Error searching category by id: ${error.message}`})
        }
    }

    async searchCategoryByIdUser(req:Request, res: Response): Promise<any>{
        try{
            const category= await categoryServices.searchCategoryByIdUser(req.params.idUser);
            return res.status(200).json(category);

        }catch(error){
            return res.status(500).json({ message: `Error searching category by IdUser: ${error.message}` })
        }
    }

    async deleteCategoryById(req:Request, res:Response): Promise<void>{
        try{
            const category= await categoryServices.deleteCategoryById(req.params.id)
            return res.status(200).json({ message: `Category deleted sucessfully`});

        }catch(error){
            return res.status(500).json({ message: `Error deleting category by Id: ${error.message}`})
        }
    }

    async updateCategoryById(req: Request, res: Response): Promise <any>{
        try{
            const categoryUpdate= await categoryServices.updateCategoryById(req.params.id,req.body);
            return res.status(200).json(categoryUpdate);
            
        }catch(error){
            return res.status(500).json({ message: `Error updating category by Id: ${error.message}`})
        }
    }

}
const categoryController= new CategoryController();
export default categoryController;