import { Curriculum } from "./Curriculum"

export class Visualization{
    visualizationId: number 
    visualizationName:string
    curriculum:Curriculum[] 
    constructor(visualizationId:number,visualizationName:string,curriculum:Curriculum[])
    {
        this.visualizationId = visualizationId
        this.visualizationName = visualizationName
        this.curriculum = curriculum
    }
}