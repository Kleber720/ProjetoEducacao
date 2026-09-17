import {Theme} from "../models/entities/Theme"

export interface ThemeRepository{
    createTheme(theme:Theme): Promise <Theme>
    searchThemeById(id:number): Promise <any>
    searchThemeByName(name:string): Promise <any>
    searchThemeByIdCategory(category:number): Promise <any>
    deleteThemeById(id:number): Promise <void>
    updateThemeById(id:number, theme:Theme): Promise <Theme | null>
}
