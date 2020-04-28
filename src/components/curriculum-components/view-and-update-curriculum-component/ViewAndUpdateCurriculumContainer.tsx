import {IState} from "../../../reducers/";
import { connect } from "react-redux";
import { ViewAndUpdateCurriculumComponent } from "./ViewAndUpdateCurriculumComponent";
import {updateCurriculumActionMapper} from "../../../action-mappers/update-curriculum-action-mapper";
import {getCurriculumByIdActionMapper} from 
"../../../action-mappers/get-curriculum-by-id-action-mapper";
import {viewAllSkillsActionMapper} from '.././/../../action-mappers/skill-action-mapper'
import { getSkillsByCategoryIdActionMapper } from '../../../action-mappers/get-skills-by-category-id-action-mapper';
import { getAllCategoriesActionMapper } from '../../../action-mappers/getall-categories-action-mappers';
import {deleteCurriculumActionMapper} from '../../../action-mappers/delete-curriculum-action-mapper';
/**
 * This is the container that wraps the ViewAndUpdateComponent. This maps the state information from 
 * the component to props 
 * 
 * @param state the state is passed to the mapStateToProps function
 */
const mapStateToProps = (state:IState) =>{

    return{

    updateCurriculum: state.curriculum.updateCurriculum,
    curriculum: state.curriculum.curriculum,
    errorMessageForUpdate: state.curriculum.errorMessage,
    errorMessageForById: state.curriculum.errorMessage,
    allSkills: state.skills.allSkills,
    errorMessageSkills: state.skills.errorMessage,
    allCategory:state.allCategory.allCategory,
    skillsByCategoryId:state.skillsByCategoryId.skillsByCategoryId,
    deleteCurriculum: state.curriculum.deleteCurriculum

    
}

}

const mapDispatchToProps = {

    updateCurriculumActionMapper,
    getCurriculumByIdActionMapper,
    viewAllSkillsActionMapper,
    getAllCategoriesActionMapper,
    getSkillsByCategoryIdActionMapper,
    deleteCurriculumActionMapper


}


export default connect(mapStateToProps,mapDispatchToProps)(ViewAndUpdateCurriculumComponent);