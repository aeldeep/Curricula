import React, { SyntheticEvent } from "react"
import { Visualization } from "../../../models/Visualization";
import { Card, CardTitle, Button, CardText, Row, ButtonGroup, Container, Col, CardBody } from "reactstrap";
import { Redirect } from "react-router";


interface IVisualizationProps{
    allVisualizations:Visualization[]
    visualization:Visualization
    errorMessage: string
    getAllVisualizationsActionMapper: () => void
    getOneVisualizationActionMapper:(id:number) => void
    deleteOneVisualizationActinoMapper:(id:number) => void
}

/**
 * @author [Anthony Cona] (Anthony-Cona)
 **/
export class ViewAllVisualizationComponent extends React.Component<IVisualizationProps,any>{

componentDidMount(){    
    this.props.getAllVisualizationsActionMapper()
}

updateView(e: SyntheticEvent,id:number){
    e.preventDefault()
    this.props.getOneVisualizationActionMapper(id)
}

// Calls getAllVisualizationsActionMapper() to rerender the view all page
async deleteVisualization(e:SyntheticEvent,id:number){
    e.preventDefault()
   await this.props.deleteOneVisualizationActinoMapper(id)
    this.props.getAllVisualizationsActionMapper()
}
    render(){

        // This maps the returned list of all visualizations to these card elements 
        let visualizationDisplay = this.props.allVisualizations.map((visualization) => {
            if(visualization.curriculum){
            return(
                <Col className="col-4 p-0 mb-3">
                    <div className="border-0 shadow h-100 mx-2">
                        <Card className="h-100 border-0">
                            <br/>
                            <CardBody className="d-flex flex-column">
                            <CardTitle className="ButtonDown m-0 mb-4 "><h5 className="m-0">{visualization.visualizationName}</h5></CardTitle>
                            {/* The map take the array of curriculums and maps them to this CardText, this will do it for all the elements */}
                            {visualization.curriculum.map(element => {return(
                            <CardText className="ButtonsDown m-1">{element.curriculumName}</CardText>)
                            })}
                            
                            <CardText className="ButtonsDown m-4 px-4">{`${window.location.href}visualization/${visualization.visualizationId}`}</CardText>
                            <ButtonGroup className="mt-auto row">
                                <Button className="col-sm-12 col-md-6 border-right border-white rounded" color="info" onClick={(e: SyntheticEvent)=>this.updateView(e,visualization.visualizationId)}>Update</Button>
                                <Button className="col-sm-12 col-md-6 border-left border-white rounded" color="danger" onClick={(e:SyntheticEvent)=>this.deleteVisualization(e,visualization.visualizationId)}>Delete</Button>
                            </ButtonGroup>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            )
                }

        })
        
//Brakes are used for spacing but this can be achived in css
        return(
        
            this.props.visualization.visualizationId !== 0 ?
            <Redirect to={`/visualization/${this.props.visualization.visualizationId}`}></Redirect>
            :
        <Container>
            <Row className="p-4 m-4 border border-light text-center rounded shadow-custom bg-light">
                <Col className="col-12 mb-2">
                    <h2>All Visualizations</h2>
                </Col>
                        {visualizationDisplay}
            </Row>
        </Container>
        )
    }
}