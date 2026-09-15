import { Category } from "../models/entities/Category"

export interface CategoryRepository{
    createCategory(category: Category): Promise<Category>
    getCategoryById(id: number): Promise<Category | null>
    getCategoryByIdUser(user: number): Promise <Category | null>
    deleteCategoryById(id:number): Promise <void>
    updateCategoryById(id:number, category:Category): Promise <Category | null>
}