import {type Page} from '@playwright/test'

export class TextBox {
    page: Page
    
    constructor(page: Page){
        
        this.page = page

    }
}