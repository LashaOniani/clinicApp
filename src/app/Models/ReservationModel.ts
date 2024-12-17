export class ReservationModel {
    public id : number = 0
    public day : string = ''
    public employee_Id : number = 0
    public user_Id : number = 0
    public start_Date : Date = new Date()
    public end_Date : Date = new Date()
    public reservation_Description : string = ''
    public status : string = ''
    constructor
    (
        id : number, 
        day : string, 
        employee_Id : number, 
        user_Id : number, 
        start_Date : Date, 
        end_Date : Date, 
        reservation_Description : string, 
        status : string
    ) 
    {
        this.id = id
        this.day = day
        this.employee_Id = employee_Id
        this.user_Id = user_Id
        this.start_Date = start_Date
        this.end_Date = end_Date
        this.reservation_Description = reservation_Description
        this.status = status
     }
}