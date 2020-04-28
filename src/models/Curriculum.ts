import { Skill } from "./Skill";

export class Curriculum {
  curriculumId:number
  curriculumName:string
  skills:Array<Skill>
  constructor(curriculumId:number,curriculumName:string,skills:Array<any>){
    this.curriculumId=curriculumId;
    this.curriculumName=curriculumName;
    this.skills=skills;
  }
}