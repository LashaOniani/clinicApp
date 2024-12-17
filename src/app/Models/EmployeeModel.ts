import { UserModel } from "./UserModel"

export class EmployeeModel extends UserModel {
    constructor(
        public category_id?: number,
        public category_name?: string,
        public review_count?: any,
        public view_count?: number
    ) { super(); }
}