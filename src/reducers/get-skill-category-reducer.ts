import { AnyAction } from "redux"

import { IGetSkillsByCategoryIdState } from '.'
import { skillCategoryTypes } from "../action-mappers/get-skills-by-category-id-action-mapper"

const initialState:IGetSkillsByCategoryIdState = {
  skillsByCategoryId:[],
  errorMessage:''
}

export const getSkillsByCategoryIdReducer = (state=initialState,action:AnyAction)=>{
  switch(action.type){
    case skillCategoryTypes.GET_SKILLS_BY_CATEGORY_ID:{
      return {
        ...state,
        skillsByCategoryId:action.payload.skillsByCategoryId
      }
    }
    case skillCategoryTypes.FAILED_TO_RETRIEVE_SKILLS:{
      return {
        ...state,
        errorMessage:action.payload.errorMessage
      }
    }
    default: return state;
  }
}