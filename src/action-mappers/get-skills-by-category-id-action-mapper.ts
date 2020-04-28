import { Dispatch } from "redux";
import { Skill } from "../models/Skill";
import { getSkillsByCategoryId } from '../remote/get-skills-by-category-id-remote';


export const skillCategoryTypes = {
  GET_SKILLS_BY_CATEGORY_ID: 'CURRICULA_GET_SKILLS_BY_CATEGORY_ID',
  FAILED_TO_RETRIEVE_SKILLS:'CURRICULA_FAILED_TO_RETRIEVE_SKILLS'
}

export const getSkillsByCategoryIdActionMapper = (id:number) => async (dispatch:Dispatch) => {
  // try to get all categories from a remote function
  try{
    let skillsByCategoryId:Array<Skill> = await getSkillsByCategoryId(id);
    skillsByCategoryId.sort();
    //if we do call dispatch with those categories
    dispatch({
      type: skillCategoryTypes.GET_SKILLS_BY_CATEGORY_ID,
      payload:{
        skillsByCategoryId
      }
    })
  } 
  catch (e){
    //catch any errors and dispatch a bad action
    dispatch({
      type:skillCategoryTypes.FAILED_TO_RETRIEVE_SKILLS,
      payload:{
        errorMessage:e
      }
    })
  }
}
