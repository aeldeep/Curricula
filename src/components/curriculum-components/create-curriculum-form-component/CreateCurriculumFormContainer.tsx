import { IState } from "../../../reducers";
import { connect } from "react-redux";
import { CreateCurriculumFormComponent } from "./CreateCurriculumFormComponent";
import { createCurriculumActionMapper } from '../../../action-mappers/create-curriculum-action-mapper';
import { getSkillsByCategoryIdActionMapper } from '../../../action-mappers/get-skills-by-category-id-action-mapper';
import { getAllCategoriesActionMapper } from '../../../action-mappers/getall-categories-action-mappers';

const mapStateToProps = (state:IState) => {
  return({
    allCategory:state.allCategory.allCategory,
    skillsByCategoryId:state.skillsByCategoryId.skillsByCategoryId,
    errorMessage:state.curriculum.errorMessage
  })
}

const mapDispatchToProps = {
  getAllCategoriesActionMapper,
  getSkillsByCategoryIdActionMapper,
  createCurriculumActionMapper
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateCurriculumFormComponent)