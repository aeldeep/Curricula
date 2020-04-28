import { curriculaClient } from "./CurriculaClient";
import { Curriculum } from "../models/Curriculum";
// import { Category } from "../models/Category";

export const curriculaUpdateCurriculum = async (curriculum:Curriculum) => {
    try{
        const response = await curriculaClient.patch('/curriculum', curriculum);
        return response.data;
      }
      catch(e){
        if(e.status<500){
          throw e;
        }
        else{
          // TODO
          //console.log("TODO!   Throw an internal server error")
        }
      }
    }
export const curriculaGetCurriculum = async (curriculum_id:number) => {
    try{
        let response = await curriculaClient.get('/curriculum/' + curriculum_id)
        return response.data;
    }catch(e){
        if(e.status === 500){
            throw e;
        }else{
            
        }
    }
}