import { IState } from "../../reducers";
import { ViewAllCategoriesComponent } from "./ViewAllCategoriesComponent";
import { getAllCategoriesActionMapper } from "../../action-mappers/getall-categories-action-mappers";
import { CategoryDeleteByIdActionMapper  } from "../../action-mappers/delete-category-action-mappers";
import { connect } from "react-redux";

const mapStateToProps = (state: IState) => {
  return {
    allCategory: state.allCategory.allCategory,
    deletedCategory: state.deleteCategoryById.deleteCategoryById,
    errorMessage: state.allCategory.errorMessage
  };
};

const mapDispatchToProps = {
  getAllCategoriesActionMapper,
  CategoryDeleteByIdActionMapper
};

const mapDeleteProps = 
{
  CategoryDeleteByIdActionMapper
};

export default connect(  mapStateToProps,  mapDispatchToProps/*, mapDeleteProps }*/ )(ViewAllCategoriesComponent);
