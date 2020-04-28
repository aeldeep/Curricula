import { IState } from "../../reducers"
import { connect } from "react-redux"
import { UpdateSkillComponent } from "./UpdateSkillComponent"
import { updateSkillActionMapper,viewAllSkillsActionMapper } from "../../action-mappers/skill-action-mapper"
import { getAllCategoriesActionMapper } from "../../action-mappers/getall-categories-action-mappers"

const mapStateToProps = (state:IState) => {
    return {
        allCategory: state.allCategory.allCategory,
        skillToUpdate: state.skills.updatedSkill,
        allSkills:state.skills.allSkills,
        errorMessage: state.skills.errorMessage        
    }
}

const mapDispatchToProps = {
    updateSkillActionMapper,
    viewAllSkillsActionMapper,
    getAllCategoriesActionMapper,
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateSkillComponent)