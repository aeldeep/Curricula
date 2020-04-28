import { curriculaClient } from "./CurriculaClient"
import { BadRequestError } from "../errors/BadRequestError"
import { InternalServiceError } from "../errors/InternalServiceError"


//took from category change to skills
export async function deleteSkillsById(skillsId:number|undefined):Promise<void>{    
    try{
        
        let res = await curriculaClient.delete(`/skills/${skillsId}`)
           return res.data

    } catch (e)
    {
        if(e.status === 400){
            throw e
        } else if(e.status === 404){
            throw new  BadRequestError()
        }
        else{
            throw new InternalServiceError()
        }
    }
  }//end of class