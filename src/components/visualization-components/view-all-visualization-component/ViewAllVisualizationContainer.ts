import { IState } from "../../../reducers"
import { connect } from "react-redux"
import {ViewAllVisualizationComponent} from "./ViewAllVisualizationComponent"
import {getAllVisualizationsActionMapper,getOneVisualizationActionMapper} from "../../../action-mappers/get-all-visualizations-action-mapper"
import {deleteOneVisualizationActinoMapper} from "../../../action-mappers/delete-visualization-action-mapper"


const mapStateToProps = (state:IState) => {
    return {
        allVisualizations: state.allVisualizations.allVisualizations,
        visualization: state.allVisualizations.visualization,
        errorMessage: state.allVisualizations.errorMessage,

    }
}

const mapDispatchToProps = {
    getAllVisualizationsActionMapper,
    getOneVisualizationActionMapper,
    deleteOneVisualizationActinoMapper
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewAllVisualizationComponent)
