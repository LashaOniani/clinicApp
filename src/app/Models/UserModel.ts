export class UserModel {
    constructor(
        public id?: number,
        public first_Name?: string,
        public last_Name?: string,
        public birthday?: Date,
        public gender?: number,
        public id_card?: string,
        public gender_str?: string,
        public person_id?: string,
        public email?: string,
        public phone?: string,
        public role_id?: number,
        public role_name?: string,
        public password?: string,
        public picData?: string
    ) { }
}