import {Theme} from "../models/entities/Theme"

export interface ThemeRepository{
    createTheme(theme:Theme): Promise <Theme>
    getThemeById(id:number): Promise <any>
    getThemeByName(name:string): Promise <any>
    getThemeByIdCategory(category:number): Promise <any>
    deleteThemeById(id:number): Promise <void>
    updateThemeById(id:number, theme:Theme): Promise <Theme | null>
}
