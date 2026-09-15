import {Theme} from "../models/entities/Theme"

export interface ThemeRepository{
    createTheme(theme:Theme): Promise <Theme>
    getThemeById(id:number): Promise <Theme | null>
    getThemeByIdCategory(category:number): Promise <Theme | null>
    deleteThemeById(id:number): Promise <void>
    updateThemeById(id:number, theme:Theme): Promise <Theme | null>
}
