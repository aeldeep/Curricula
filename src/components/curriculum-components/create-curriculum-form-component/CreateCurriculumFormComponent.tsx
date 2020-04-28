import React, { SyntheticEvent } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap';
import { Curriculum } from '../../../models/Curriculum';
import { Skill } from '../../../models/Skill';
import { Category } from '../../../models/Category';
import { Redirect } from 'react-router';
import { SkillCardComponent } from '../general-components/SkillCardComponent';

/**
 * Component Props from Redux
 */
interface ICreateCurriculumFormProps {
  getAllCategoriesActionMapper:()=>any
  getSkillsByCategoryIdActionMapper:(id:number)=>any,
  createCurriculumActionMapper:(c:Curriculum)=>any,
  allCategory:Array<Category>,
  skillsByCategoryId:Array<Skill>,
  errorMessage:string
}
/**
 * Component State
 */
interface ICreateCurriculumFormState {
  name:string,
  existSkillList:Array<any>,
  notExistSkillList:Array<any>,
  categoryId:number,
  isLoading:boolean,
  alert:string,
  isRedirect:boolean
}
/**
 * Component for showing a form to create a curriculum.
 * 
 * @component
 * @author [Gerard Cancino](https://github.com/Gerard-Cancino)
 * @author [Charles Perry](https://github.com/perryc85)
 * @author [Nikoloi Ellis](https://github.com/nikoloiellis)
 * @author [Carlos Krugar](https://github.com/carloskruger)
 */
export class CreateCurriculumFormComponent extends React.Component<ICreateCurriculumFormProps,ICreateCurriculumFormState>{

  /**
   * Instantiating component with props
   * @param {ICreateCurriculumFormProps} props Properties that are being inserted into the component
   */
  constructor(props:ICreateCurriculumFormProps){
    super(props);
    this.state={
      name:'',
      existSkillList:[],
      notExistSkillList:[],
      categoryId:1,
      isLoading:false,
      alert:"",
      isRedirect:false
    }
    this.handlerName=this.handlerName.bind(this);
    this.handlerCategory=this.handlerCategory.bind(this);
    this.handlerAddSkill=this.handlerAddSkill.bind(this);
    this.handlerRemoveSkill=this.handlerRemoveSkill.bind(this);
    this.submitCategory=this.submitCategory.bind(this);
    this.submitCurriculum=this.submitCurriculum.bind(this);
  }
  /**
   * Set the properties of the component after mount
   */
  async componentDidMount(){
    if(this.props.allCategory){
      await this.props.getAllCategoriesActionMapper().then(()=>{
        if(this.props.allCategory.length!==0)
          this.props.getSkillsByCategoryIdActionMapper(this.props.allCategory[0].categoryId);
      });
    }
  }
  /**
   * Get a derived state from the properties.  From properties filter and remove skill that does not already exist in current skills.  
   * @param {ICreateCurriculumFormProps} props 
   * @param {ICreateCurriculumFormState} state 
   */
  static getDerivedStateFromProps(props:ICreateCurriculumFormProps,state:ICreateCurriculumFormState){
    const notExistSkillList=props.skillsByCategoryId.filter((el:Skill)=>!state.existSkillList.some((item:Skill)=>el.skillId===item.skillId));
    return {
      notExistSkillList:notExistSkillList,
    }
  }
  /**
   * Event handler for name
   * @param {React.ChangeEvent<HTMLInputElement>} e event for when there is a new input
   */
  handlerName(e:React.ChangeEvent<HTMLInputElement>){this.setState({name:e.target.value})}
  /**
   * Event handler for category
   * @param {React.ChangeEvent<HTMLInputElement>} e event for when a new category is selected
   */
  handlerCategory(e:React.ChangeEvent<HTMLInputElement>){this.setState({categoryId:+e.target.value})}
  /**
   * Event for when a skill is added.  Add skill to existing list and remove skill for non existing list
   * @param {SyntheticEvent} e Event for when a button is triggered
   * @param {Skill} skill Skill to add onto existing skill list
   */
  handlerAddSkill(e:SyntheticEvent,skill:Skill){
    const newSkillList= [...this.state.existSkillList,skill].sort((a:Skill,b:Skill)=>{return a.category.categoryId-b.category.categoryId});
    this.setState({existSkillList:newSkillList});
    this.setState({notExistSkillList:this.state.notExistSkillList.filter((el:Skill)=>el.skillId!==skill.skillId)})
  }
  /**
   * Event for when a skill is removed.  Add skill to non existing list and remove skill from existing list.
   * @param {SyntheticEvent} e Event for when a button is triggered
   * @param {Skill} skill Skill to remove from the existing skill list 
   */
  handlerRemoveSkill(e:SyntheticEvent,skill:Skill){
    const newNotSkillList= [...this.state.existSkillList,skill];
    this.setState({notExistSkillList:newNotSkillList});
    this.setState({existSkillList:this.state.existSkillList.filter((el:Skill)=>el.skillId!==skill.skillId)})
  }
  /**
   * Submit a category and search for skills by the categories id
   * @param {SyntheticEvent} e Event for when the button is pressed
   */
  submitCategory(e:SyntheticEvent){
    e.preventDefault();
    this.props.getSkillsByCategoryIdActionMapper(this.state.categoryId);
  }
  /**
   * Send a create curriculum request
   * @param {SyntheticEvent} e Event for when the button is triggered 
   */
  async submitCurriculum(e:SyntheticEvent){
    e.preventDefault();
    if(this.state.existSkillList.length===0){
      this.setState({alert:"Please include at least one skill"},()=>
        setTimeout(()=>this.setState({alert:""}),5000))
    }
    else if(!this.state.name){
      this.setState({alert:"Name is required"},()=>
        setTimeout(()=>this.setState({alert:""}),5000))
    }
    else{
      this.setState({isLoading:true})
      const curriculum = new Curriculum(0,this.state.name,this.state.existSkillList);
      await this.props.createCurriculumActionMapper(curriculum).then((e:any)=>{
        this.setState({isLoading:false,isRedirect:true})
      })
    }
  }
  render(){
    /**
     * Create a dropdown list for categories
     */
    const categoryList = this.props.allCategory.map((el:Category)=>(<option key={el.categoryId} value={el.categoryId}>{el.categoryName}</option>));
    /**
     * Create a card list for each existing skill
     */
    const existingSkillList = this.state.existSkillList.map((el:Skill)=><SkillCardComponent skill={el} isAdd={false} handlerSkill={this.handlerRemoveSkill}/>);
    /**
     * Create a card list for each none existing skill
     */
    const notExistingSkillList = this.state.notExistSkillList.map((el:Skill)=><SkillCardComponent skill={el} isAdd={true} handlerSkill={this.handlerAddSkill}/>);
    return(
      <Container>
        {this.state.isRedirect && <Redirect to={"/curriculum"}/> }
        <Row className="p-4 m-4 border border-light text-left rounded shadow-custom bg-light">
          {this.props.errorMessage && <Alert color="danger">{this.props.errorMessage}</Alert>}
          <Col >
            <h2 className="text-center">Create Curriculum Form</h2>
            <Form>
              <FormGroup>
                <Label className="text-left col-sm-12 font-weight-bold">Name</Label>
                <Input type="text" onChange={this.handlerName} placeholder="Enter the Curriculum Name" defaultValue={this.state.name} required/>
              </FormGroup>
            </Form>
            <Form inline onSubmit={this.submitCategory}>
              <FormGroup className="col-sm-10 pl-0">
                <Label className="justify-content-start col-sm-2 font-weight-bold">Category</Label>     
                <Input type="select" name="category" className="col-sm-10" onChange={this.handlerCategory}>
                  {categoryList}
                </Input>
              </FormGroup>
              <Button color="primary" className="col-sm-2">Search</Button>
            </Form>
            <Form onSubmit={this.submitCurriculum}>
              <Button color="primary" type="submit" className="my-3 col-sm-12">Submit</Button>
            </Form>
            {this.state.alert && <Alert color="warning">{this.state.alert}</Alert>}
            <Form>
              <FormGroup>
                <Row className="m-0">
                  <Label className="col-12 font-weight-bold">Selected Skills</Label>
                  {this.state.existSkillList.length!==0 &&
                    <React.Fragment>
                      {existingSkillList}
                    </React.Fragment>
                  }
                </Row>
                <Row className="m-0">
                  <Label className="col-12 font-weight-bold">Available Skills</Label>
                  {this.state.notExistSkillList.length!==0 &&
                    <React.Fragment>
                      {notExistingSkillList}
                    </React.Fragment>
                  }
                </Row>
              </FormGroup>
            </Form>
            {this.state.isLoading && <Alert>Loading</Alert>}
          </Col>
        </Row>
      </Container>
    )
  }
}