import { Category } from "../models/entities/Category"

export interface CategoryRepository{
    createCategory(category: Category): Promise<Category>
    searchCategoryByName(name: string): Promise<any>
    searchCategoryById(id: number): Promise<any>
    searchCategoryByIdUser(user: number): Promise <any>
    deleteCategoryById(id:number): Promise <void>
    updateCategoryById(id:number, category:Category): Promise <any>
}