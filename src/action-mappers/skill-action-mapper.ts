import { Dispatch } from "redux"
import { getAllSkills, createSkill, updateSkill, deleteSkill } from "../remote/SkillsRequest"
import { Category } from "../models/Category"
import { Skill } from "../models/Skill"

export const getAllSkillTypes = {
    GET_ALL_SKILLS: 'PROJECT-3_GET_ALL_SKILLS',
    FAILED_TO_RETRIEVE_SKILLS:'PROJECT-3_FAILED_TO_RETRIEVE_SKILLS'
}

export const createSkillTypes ={
    CREATE_SKILL: 'PROJECT-3_SKILL_CREATED',
    FAILED_CREATE_SKILL:'PROJECT-3_FAILED_CREATE_SKILL'
}

export const updateSkillTypes = {
    UPDATED_SKILL: 'PROJECT-3_UPDATED_SKILL',
    FAILED_TO_UPDATE_SKILL:'PROJECT-3_FAILED_TO_UPDATE_SKILL'
}

export const deletedSkillTypes ={
    DELETED_SKILL: 'PROJECT-3_DELETED_SKILL',
    FAILED_DELETE_SKILL: 'PROJECT-3_FAILED_DELETE_SKILL'
}


export const viewAllSkillsActionMapper = () => async (dispatch:Dispatch) => {
    try{
        let skillsArray = await getAllSkills()
        dispatch({
            type: getAllSkillTypes.GET_ALL_SKILLS,
            payload:{
                skillsArray
            }
        })
    } catch (e){
        dispatch({
            type:getAllSkillTypes.FAILED_TO_RETRIEVE_SKILLS
        })
    }
}

export const createSkillActionMapper = (skillName:string, category:Category) => async (dispatch:Dispatch) => {
    try{
        let createdSkill = await createSkill(skillName, category)
        dispatch({
            type: createSkillTypes.CREATE_SKILL,
            payload:{
                createdSkill
            }
        })
    }catch(e){
        dispatch({
            type:createSkillTypes.FAILED_CREATE_SKILL
        })
    }
}

export const updateSkillActionMapper = (id:number, name:string, category:Category) => async (dispatch:Dispatch) => {
    console.log(id, name, category);
    try{
        
        
        let updatedSkill = await updateSkill(id,name,category)
        dispatch({
            type: updateSkillTypes.UPDATED_SKILL,
            payload:{
                updatedSkill
            }
        })
    } catch (e){
        dispatch({
            type:updateSkillTypes.FAILED_TO_UPDATE_SKILL
        })
    }
    //function completes
}

export const deleteSkillActionMapper = (id:number) => async (dispatch:Dispatch) => {
    try{
        let deletedSkill = await deleteSkill(id)
        dispatch({
            type: deletedSkillTypes.DELETED_SKILL,
            payload:{
                deletedSkill
            }
        })
    }catch(e){
        dispatch({
            type:deletedSkillTypes.FAILED_DELETE_SKILL
        })
    }
}


