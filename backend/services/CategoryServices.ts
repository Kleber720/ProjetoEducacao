import { Category } from "../models/entities/Category";
import { createCategoryDTO } from "../models/dto/category/createCategoryDTO";
import { responseSearchCategoryByIdDTO} from "../models/dto/category/responseSearchCategoryById"
import { responseSearchCategoryByIdUserDTO } from "../models/dto/category/responseSearchCategoryByIdUse";
import categoryInfrastructure from "../infrastructure/CategoryInfrastructure"
import userInfrastructure from "../infrastructure/UserInfrastructure"
import { User } from "../models/entities/User";

class CategoryServices {

    async createCategory(categoryDTO: createCategoryDTO): Promise<any> {
        try{
            const verifyUser= await userInfrastructure.searchUserById(categoryDTO.user);
            if(!verifyUser){
                throw new Error("User not found");
            }

            const user= new User(
                verifyUser[0].name,
                verifyUser[0].password,
                verifyUser[0].email,
                verifyUser[0].phone,
                verifyUser[0].id
            );

            const category= new Category(
            categoryDTO.name,
            user
            );

           const categoryId= await categoryInfrastructure.createCategory(category);
           
            const newCategory: createCategoryDTO= {
                id: categoryId,
                name: String(category.getName()),
                user: Number(user.getId())
            }
            return newCategory;

        }catch(error){
            throw new Error(`Error when registering a category: ${error}`)
                    
        }   
            
    }

    async searchCategoryById(responseSearchCategoryByIdDTO: responseSearchCategoryByIdDTO): Promise<any> {
        try{
            const category= await categoryInfrastructure.searchCategoryById(responseSearchCategoryByIdDTO.id);
            if(!category){
                throw new Error("Category not found");
            }
            return category;

        }catch(error){
            throw new Error(`Error when searching a category: ${error}`)
        }
    }

    async searchCategoryByIdUser(responseSearchCategoryByIdUserDTO: responseSearchCategoryByIdUserDTO): Promise<any> {
        try{
            const category= await categoryInfrastructure.searchCategoryByIdUser(responseSearchCategoryByIdUserDTO.id);
            if(!category){
                throw new Error("Category not found");
            }
            return category;

        }catch(error){
            throw new Error(`Error when searching a category: ${error}`)
        }
    }

    async deleteCategoryById(id: number): Promise<void> {
        try{
            const categoryExistent= await categoryInfrastructure.searchCategoryById(id);
            if(!categoryExistent){
                throw new Error("Category not found");
            }

            await categoryInfrastructure.deleteCategoryById(id);

        }catch(error){
            throw new Error(`Error when deleting a category: ${error}`)
        }
    }

    async updateCategoryById(id: number, categoryDTO: createCategoryDTO): Promise<createCategoryDTO> {
        try{
            const categoryExistent= await categoryInfrastructure.searchCategoryById(id);
            if(!categoryExistent){
                throw new Error("Category not found");
            }
            
            const categoryUpdated= new Category(
            categoryDTO.name || categoryExistent.name,
            categoryExistent.user
            );

            await categoryInfrastructure.updateCategoryById(id, categoryUpdated);

            const categoryResponse: createCategoryDTO= {
                id: id,
                name: String(categoryUpdated.getName()),
                user: Number(categoryExistent.user)
            }
            return categoryResponse;

        }catch(error){
            throw new Error(`Error when updating a category: ${error}`)
        }
    }
}
