import { Category } from "../models/entities/Category"

export interface CategoryRepository{
    createCategory(category: Category): Promise<Category>
    getCategoryByName(name: string): Promise<any>
    getCategoryByIdUser(user: number): Promise <any>
    deleteCategoryById(id:number): Promise <void>
    updateCategoryById(id:number, category:Category): Promise <any>
}