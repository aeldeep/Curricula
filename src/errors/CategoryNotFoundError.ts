import { HttpError } from "./HttpErrors";


export class CategoryNotFoundError extends HttpError{
    constructor(){
        super('User Not Found', 404)
    }
}

