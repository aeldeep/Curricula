import { HttpError } from "./HttpErrors";

export class BadRequestError extends HttpError{
    constructor(){
        super('Bad Request', 400)
    }
}