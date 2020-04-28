export class Category{
    categoryId: number 
    categoryColor:string
    categoryName:string 
    constructor(categoryId:number,categoryColor:string,categoryName:string)
    {
        this.categoryId = categoryId
        this.categoryColor = categoryColor
        this.categoryName = categoryName
    }
}