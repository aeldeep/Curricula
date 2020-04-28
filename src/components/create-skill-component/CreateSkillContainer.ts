import { IState } from "../../reducers";
import { createSkillActionMapper } from "../../action-mappers/skill-action-mapper";
import { getAllCategoriesActionMapper } from "../../action-mappers/getall-categories-action-mappers";
import { connect } from "react-redux";
import { CreateSkillComponent } from "./CreateSkillComponent";

const mapStateToProps = (state: IState) => {
  return {
    createdSkill: state.skills.createdSkill,
    allCategory: state.allCategory.allCategory,
    errorMessage: state.skills.errorMessage,
  };
};

const mapDispatchToProps = {
  createSkillActionMapper,
  getAllCategoriesActionMapper,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSkillComponent);
