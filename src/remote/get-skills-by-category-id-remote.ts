import { curriculaClient } from "./CurriculaClient"
import { InternalServiceError } from "../errors/InternalServiceError"

export const getSkillsByCategoryId = async (id:number)=>{
  try{
    let skills = await curriculaClient.get(`/skill/categoryId/${id}`).catch(e=>{throw e});
    return skills.data;
  } 
  catch (e) {
    if(e.status === 400){
      throw e;
    } 
    else{
      throw new InternalServiceError()
    }
  }
}