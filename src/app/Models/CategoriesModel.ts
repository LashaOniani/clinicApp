export class CategoriesModel {
    constructor(
       public categoryId?: number,
       public categoryName?: string,
       public categoryDescription?: string,
       public categoryDoctorsCount?: number,
    ) { }
}