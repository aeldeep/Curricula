import { deleteSkillsById } from "../remote/delete-skills-remote";


export const deleteSkillsActionMapper = (skillsId:number) => async () => {
    try{
      await deleteSkillsById(skillsId);
    }
    catch(e){
   
    }
}