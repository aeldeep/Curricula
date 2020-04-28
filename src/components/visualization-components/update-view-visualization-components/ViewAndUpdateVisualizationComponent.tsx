import React, { SyntheticEvent } from "react"
import { Visualization } from "../../../models/Visualization";
import { Button, Card, Row, Container, Col, ButtonGroup, Form, FormGroup, Label, CustomInput, Input } from "reactstrap";
import { Curriculum } from "../../../models/Curriculum";
import { Skill } from "../../../models/Skill";
import { Category } from "../../../models/Category";

interface IUpdateViewVisualizationProps {
    visualization: Visualization
    errorMessage: string
    allCurriculumList: Curriculum[]
    getOneVisualizationActionMapper: (id: number) => void
    updateVisualizationActionMapper: (visualizationToUpdate: Visualization) => void
    viewCurriculumListActionMapper: () => void
}

interface IUpdateViewVisualizationState {
    visualizationName: string
    updateCurriculumList: any[]
    skills: Skill[]
    updateVisualization: boolean
}
/**
 * @author [Anthony Cona] (Anthony-Cona)
 * @author [Gerard Cancino] (Gerard-Cancino)
 * @author [Shana Brown] (Shanabrown513)
 **/
export class ViewAndUpdateVisualizationComponent extends React.Component<IUpdateViewVisualizationProps, IUpdateViewVisualizationState>{

    constructor(props: any) {
        super(props)
        this.state = {
            skills: [],
            updateVisualization: false,
            visualizationName: "",
            updateCurriculumList: []
        }
    }

    //Custom object Used for checkboxes that holds the curriculum Id informations and name but not the skills list, and if in current Visualization
    convertCurriculumToCheckedObject(curriculum: Curriculum, isExist: boolean) {
        return ({
            curriculumId: curriculum.curriculumId,
            curriculumName: curriculum.curriculumName,
            isExist: isExist
        })
    }

    async componentDidMount() {
        //If the Id is in its intial state then it grabs the  information based off the last part of the url
        if (this.props.visualization.visualizationId === 0) {
            await this.props.getOneVisualizationActionMapper(+window.location.href.substring(window.location.href.lastIndexOf('/') + 1))
        } else { //If the Id value is not in the inital state then it will grab the curriculms in the DB to display for update
            await this.props.viewCurriculumListActionMapper()
            //maps the All curriculums list into custom object above <-- used to make checkboxes clickable and update when pressed
            //If the curriculm is in the current visualization it gets a value of true otherwise it gets a false value
            const checkedCurriculumList = this.props.allCurriculumList.map((c: Curriculum) => {
                if (this.props.visualization.curriculum.some((c2: Curriculum) => c.curriculumId === c2.curriculumId)) {
                    return this.convertCurriculumToCheckedObject(c, true);
                }
                else {
                    return this.convertCurriculumToCheckedObject(c, false);
                }
            })
            //Sets the state for update conditional render
            this.setState({
                updateVisualization: true,
                updateCurriculumList: checkedCurriculumList
            })
        }
    }

   
    handlerSkillInCurriculum(e: SyntheticEvent, curriculum: Curriculum) {
        e.preventDefault()
        this.setState({
            skills: curriculum.skills
        })
    }

    updateVisualizationName = (e: any) => {
        this.setState({
            visualizationName: e.currentTarget.value
        })
    }

    // Update used for curriculum check boxes.
    updateVisualizationCurriculum = (id: number) => {
        const newCurriculumList = this.state.updateCurriculumList.map((c: any) => {
            if (c.curriculumId === id) {
                return {
                    curriculumId: c.curriculumId,
                    curriculumName: c.curriculumName,
                    isExist: !c.isExist
                }
            }
            else {
                return c;
            }
        })
        this.setState({ updateCurriculumList: newCurriculumList })
    }

    //sends the update to the update action mapper
    updateVisualization = async (e: SyntheticEvent) => {
        e.preventDefault()

        //Empty array used to store the curriculmns that are checked and should be apart of the visualization
        let array: any[] = []

        //If isExist is ture it puts that object into the new array else it does nothing
        this.state.updateCurriculumList.forEach((element: any) => {
            if (element.isExist) {
                array.push({ curriculumId: element.curriculumId })
            }
        })
        //calls update then waits for response to get the updated visualizaionand the display on screen
        await this.props.updateVisualizationActionMapper(new Visualization(this.props.visualization.visualizationId, this.state.visualizationName, array))
        this.props.getOneVisualizationActionMapper(this.props.visualization.visualizationId)
    }

    render() {

/************ Alternate Way to get data explained *****************
 * 
 * Before the render returns it grabs all the information that is in the current Visualization and stores it to displays.
 * getting the information to store into displays could be done by grabbing data from the Data base and storing it in the state. 
 * But because when retreaving a visualization we also return all of its information its better to use that information here
 ***********/

        //Array used to display the skills that are in the curriculum of the current visualization
        const newSkills: Skill[] = [];

        //Checks to make sure the visualization curriculum list has a value
        if (this.props.visualization.curriculum !== null) {
            //For every skill in a curriculum in the current visualization then add it to the newSkills array
            this.props.visualization.curriculum.forEach((curriculum: Curriculum) => {
                if (curriculum.skills !== null) {
                    curriculum.skills.forEach((skill) => {
                        //Only Adds one skill even if multiple curriculums have the same skill
                        if (!newSkills.some(item => item.skillId === skill.skillId)) {
                            newSkills.push(skill);
                        }
                    }
                    )
                }
            })
            //Sorts the array of skills by color alphabetically
            newSkills.sort((a, b) => {
                return a.category.categoryName.localeCompare(b.category.categoryName)
            })
        }

        //Grabs a list of categories based off the skills in the current Visualization
        const categoryList: Category[] = []

        newSkills.forEach((skill) => {
            if (!categoryList.some(item => item.categoryId === skill.category.categoryId)) {
                categoryList.push(skill.category)
            }
        })

/*****
 * Display Mapping Section - Takes all the newly stored data and maps them to display information
 ****/

        //maps Category data for ledger of visualization
        let categoryDisplay = categoryList.map((category) => {
            return (
                <Card style={{ backgroundColor: category.categoryColor }} className="rounded-pill border-dark text-light m-1 font-weight-bold" >{category.categoryName}</Card>
            )
        })

        //Maps Curriculum data for visualization
        let displayCurriculum = this.props.visualization.curriculum.map((curriculum) => {
                return (
                    <Button onMouseOver={(e: SyntheticEvent) => this.handlerSkillInCurriculum(e, curriculum)} className="bg-light m-1 border-bottom border-top-0 border-left-0 border-right-0 text-dark">{curriculum.curriculumName}</Button>
                )
            })
        
        //Maps Skill data for visualization
        let skillDisplay = newSkills.map((skill) => {
            return (
                this.state.skills.some((item: Skill) => item.skillId === skill.skillId) ?
                    <Button style={{ backgroundColor: skill.category.categoryColor }} className="rounded-pill text-light m-1 font-weight-bold" >{skill.skillName}</Button>
                    :
                    //Number following skill.cateogry.cateogryColor is the alpha value used for fading skills not in curriculum in Visualization
                    <Button style={{ backgroundColor: `${skill.category.categoryColor}61` }} className="rounded-pill text-light m-1 font-weight-bold">{skill.skillName}</Button>
            )
        })

        //Maps all Curriculums into checkboxes for update
        const curriculumCheckBoxes = this.state.updateCurriculumList.map((el) => (
                <CustomInput onChange={this.updateVisualizationCurriculum.bind(this, el.curriculumId)} className="p-3" type="checkbox" id={`${el.curriculumId}`} label={el.curriculumName} value={el.curriculumId} checked={el.isExist} />
            ))

        return (
    
            <>
                <br /><br /><br /><br />
                {/* Visualization display */}
                <h3>{this.props.visualization.visualizationName}</h3>
                <br />
                <Container className="shadow-custom rounded p-3">
                    <Row>
                        <Col className="col-sm-6">
                            <ButtonGroup vertical className="w-100">
                                {displayCurriculum}
                            </ButtonGroup>
                        </Col>
                        <Col className="col-sm-4">
                            {skillDisplay}
                        </Col>
                        <Col className="col-sm-2">
                            {categoryDisplay}
                        </Col>
                    </Row>
                </Container>
                {/* Check here is for if the update information needs to be displayed if false returns nothing */}
                {this.state.updateVisualization &&
                    <>
                        <br /><br /><br /><br />
                        <Label>Warning Refresh will remove update and progress will be lost</Label>
                        <Form onSubmit={this.updateVisualization} className="w-50 p-3 m-auto">
                            <Label for="exampleCheckbox">Check Curriculum to add or remove from current Visualization</Label>
                            <FormGroup check inline>
                                {curriculumCheckBoxes}
                            </FormGroup>
                            <FormGroup>
                                <Label>Visualization Name</Label>
                                <Input type="text" onChange={this.updateVisualizationName.bind(this)} placeholder={`${this.props.visualization.visualizationName}`} />
                            </FormGroup>
                            <Button color="primary">Submit</Button>
                        </Form>
                    </>
                }
            </>)
    }

}