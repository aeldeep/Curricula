import { IState } from "../../../reducers"
import { connect } from "react-redux"
import {ViewAndUpdateVisualizationComponent} from "./ViewAndUpdateVisualizationComponent"
import {getOneVisualizationActionMapper} from "../../../action-mappers/get-all-visualizations-action-mapper"
import {updateVisualizationActionMapper} from "../../../action-mappers/update-visualization-action-mapper"
import {viewCurriculumListActionMapper} from "../../../action-mappers/view-curriculum-list-action-mapper"

const mapStatetoProps = (state: IState) => {
    return {
        visualization: state.allVisualizations.visualization,
        errorMessage: state.allVisualizations.errorMessage,
        allCurriculumList: state.curriculum.curriculumList
    }
}

const mapDispatchToProps = {
    getOneVisualizationActionMapper,
    updateVisualizationActionMapper,
    viewCurriculumListActionMapper
}

export default connect(mapStatetoProps,mapDispatchToProps)(ViewAndUpdateVisualizationComponent)