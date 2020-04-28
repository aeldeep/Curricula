import { IState } from "../../reducers";
import { UpdateCategoryComponent } from "./UpdateCategoryComponent";
import { updateCategoryActionMapper } from "../../action-mappers/update-category-action-mapper";
import { connect } from "react-redux";

const mapStateToProps = (state: IState) => {
  return {
    updatedCategory: state.allCategory.updatedCategory,
    errorMessage: state.allCategory.errorMessage
  };
};

const mapDispatchToProps = {
  updateCategoryActionMapper
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCategoryComponent);
