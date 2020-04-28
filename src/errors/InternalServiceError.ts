import { HttpError } from "./HttpErrors";


export class InternalServiceError extends HttpError{
    constructor(){
        super('Internal Service Error', 500)
    }
}