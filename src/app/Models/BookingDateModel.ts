import { ReservationModel } from "./ReservationModel";

export class BookingDateModel {
    constructor(
        public id : number,
        public day : string,
        public wholeDate : Date,
        public description : string,
        public isReserved : boolean,
        public reservations : ReservationModel[]
    ){ }
}