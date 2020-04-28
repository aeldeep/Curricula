import { Skill } from "../../models/Skill"
import { Row, Button, Card,  CardTitle, CardText, CardDeck } from "reactstrap"
import { IState } from "../../reducers"
import { connect } from "react-redux"
import React, { SyntheticEvent } from "react"
import { viewAllSkillsActionMapper, deleteSkillActionMapper } from "../../action-mappers/skill-action-mapper"
import { getAllCategoriesActionMapper } from "../../action-mappers/getall-categories-action-mappers"
import { Category } from "../../models/Category"
import { Redirect } from "react-router"



export interface IViewAllSkillsProps{
    allSkills:Skill[]
    allCategory:Category[]
    errorMessage:string
    viewAllSkillsActionMapper:()=>void   
    getAllCategoriesActionMapper:()=>void
    deleteSkillActionMapper:(id:number)=>void
}

export interface IViewAllSkillState{
    redirect:boolean
}


export class ViewAllSkillsComponent extends React.Component<IViewAllSkillsProps,any>{
    constructor(props:any){
        super(props)
        this.state ={
            redirect: false
        }
    }
    componentWillMount(){
            return (this.props.viewAllSkillsActionMapper(),this.props.getAllCategoriesActionMapper())
    }

    update = async (e: SyntheticEvent) =>{
        e.preventDefault()
        return (
            <Redirect to = "/skills/update"/>
        )
    }

    delete = (id:number) => async (e: SyntheticEvent) =>{
        e.preventDefault()
        this.props.deleteSkillActionMapper(id)

    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/skills/update' />
        }
    }

        render(){
        this.props.allSkills.sort((a,b) =>{
            return a.category.categoryName.localeCompare(b.category.categoryName)})

            let view = this.props.allSkills.map((skill) => { 

            return (
                <>

{/* <div className="col-3 mx-1 my-1 ">
           <Card style={{ width: '20rem' }} className=" p-1 visualizationCard shadow-custom m-auto">
                <CardTitle>{skill.skillName}</CardTitle>
                <CardText style={{color: skill.category.categoryColor}}>{skill.category.categoryName} ███</CardText>
                <Row className="d-flex justify-content-center">
                <Button onClick = {this.setRedirect} className="col-4"color="info">Update</Button>
                <Button onClick = {this.delete(skill.skillId)} className="col-4" color="danger">Delete</Button>                
                </Row>
                
               </Card>
               </div> */}
                <div className="col-3 mx-1 my-1 ">
                <Card className=" p-1 col-8 w-100 isualizationCard shadow-custom">
                <CardTitle>{skill.skillName}</CardTitle>
                <CardText style={{color: skill.category.categoryColor}}>{skill.category.categoryName} ███</CardText>
                {this.renderRedirect()}
                <Row className="d-flex justify-content-center">
                <Button onClick = {this.setRedirect} className="col-4"color="info">Update</Button>
                <Button onClick = {this.delete(skill.skillId)} className="col-4" color="danger">Delete</Button>                
                </Row>
               </Card>
               </div>
            </>
        )})     

        this.props.allCategory.sort((a,b) =>{
            return a.categoryName.localeCompare(b.categoryName)}) 

        let legend = this.props.allCategory.map((category) => {
            return(
                <>
                <Button className="rounded-pill text-light m-auto font-weight-bold p-10"
                                style={{backgroundColor: category.categoryColor}}>{category.categoryName}</Button>
                </>
            )
        })
     
        return(
            <>
                <h3 className = "skillTitle">All Skills</h3>
            
                <Row className="d-flex justify-content-center">
                        {view}
                </Row>        
            </>
            

        )
    }
}
        //add to render for list of categories (can be used to sort skills)
        // <br/><br/>
        //     <Container>
        //         <Row xs="6">
        //         {legend}
        //         </Row>
        //     </Container>

const mapStateToProps = (state:IState) => {
    return {
        allSkills: state.skills.allSkills,
        allCategory:state.allCategory.allCategory,
        errorMessage: state.skills.errorMessage        
    }
}

const mapDispatchToProps = {
    viewAllSkillsActionMapper,
    getAllCategoriesActionMapper,
    deleteSkillActionMapper
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewAllSkillsComponent)

