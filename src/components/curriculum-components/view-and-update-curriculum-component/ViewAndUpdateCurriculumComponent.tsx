import React, { SyntheticEvent } from "react";
import {
	Container,
	Button,
	Row,
	Col,
	Card,
	CardTitle,
	Input,
	Label,
	Form,
	FormGroup,
	CardBody,
} from "reactstrap";
import { Curriculum } from "../../../models/Curriculum";
import {
	BrowserRouter as Router,
	Redirect,
} from "react-router-dom";
import { Skill } from "../../../models/Skill";
import { Category } from "../../../models/Category";

/**
 * This is the interface for accepting props into view and update. 
 * It includes action mappers 
 */
interface IViewAndUpdateCurriculumProps {
   updateCurriculumActionMapper:(c:Curriculum)=>any,
    updatedCurriculum: Curriculum,
    curriculum:Curriculum,
    getCurriculumByIdActionMapper:(id:number)=>any,
    match:any,
    getAllCategoriesActionMapper:()=>any
    getSkillsByCategoryIdActionMapper:(id:number)=>any,
    viewAllSkillsActionMapper:() => void,
    errorMessageSkills:string,
    allCategory:Array<Category>,
    skillsByCategoryId:Array<Skill>
		deleteCurriculumActionMapper: (id: number) => any;

}

/** This is the interface for the View and Update Curriculum state */
interface IViewAndUpdateCurriculumState {
	currentSkillList: Array<any>;
	isShowUpdate: boolean;
	skills: Curriculum[];
	existSkillList: Array<any>;
	notExistSkillList: Array<any>;
	categoryId: number;
	name: string;
	isLoading: boolean;
	alert: string;
	isRedirect:boolean
}

/** This is the ViewandUpdateCurriculum component. It uses the interfaces IViewAndUpdateCurriculumProps and IViewAndUpdateCurriculumState. Its state has the following fields:
 * name, currentSkills, isShowUpdate, skills, existSkillList, notExistSkillsList, categoryId,
 * isLoading, alert, isRedirect
 */
export class ViewAndUpdateCurriculumComponent extends React.Component<
	IViewAndUpdateCurriculumProps,
	IViewAndUpdateCurriculumState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			name: "",
			currentSkillList: [],
			isShowUpdate: false,
			skills: [],
			existSkillList: [],
			notExistSkillList: [],
			categoryId: 1,
			isLoading: false,
			alert: "",
			isRedirect:false
		};

		this.handlerName = this.handlerName.bind(this);
		this.handlerCategory = this.handlerCategory.bind(this);
		this.handlerAddSkill = this.handlerAddSkill.bind(this);
		this.handlerRemoveSkill = this.handlerRemoveSkill.bind(this);
		this.submitCategory = this.submitCategory.bind(this);
		this.submitCurriculum = this.submitCurriculum.bind(this);
		this.submitDeleteCurriculum = this.submitDeleteCurriculum.bind(this);
	}

	/** This is the method for verifying if a the compenent mounted to the DOM. 
	 * 	We call the getCurriculumByIdActionMapper because we need the id. 
	 *  We also call the getAllCategoriesActionMapper to retrieve data from categories.
	 *  fields:
	 * 		id, this.props.getCurriculumByIdActionMapper(parseInt(id)), this.props.getAllCategoriesActionMapper()
	 * 
	 */
	async componentDidMount() {
		let id;
		if (this.props.match) {
			id = this.props.match.params.id;
			console.log(id);
		}
		if (id) {
			await this.props.getCurriculumByIdActionMapper(parseInt(id));
		}

		if (this.props.allCategory) {
			await this.props.getAllCategoriesActionMapper();
		}
		let emptyArr: Array<Skill> = [];
		this.props.curriculum.skills.forEach((skill: Skill) =>
			emptyArr.push(skill)
		);
		this.setState({
			existSkillList: emptyArr,
		});
	}

	/*
      InitalState: // occur in component did mount
        - curriculum's skill
      existing: // handler or update
        - initalstate + changes
      not existing
        - changes not
    */
	static getDerivedStateFromProps(
		props: any,
		state: IViewAndUpdateCurriculumState
	) {
		const notExistSkillList = props.skillsByCategoryId.filter(
			(el: Skill) =>
				!state.existSkillList.some((item: Skill) => el.skillId === item.skillId)
		);

		return {
			notExistSkillList: notExistSkillList,
		};
	}

	/**
	 * This is the function that gets called from the component as a result of clicking on
	 * the delete button. It calls the deleteCurriculumMapper passing the curriculumId that is
	 * obtained from the props
	 * @param e This function is started from a click event therefore it takes a SyntheticEvent * as a parameter
	 */
	async submitDeleteCurriculum(e: SyntheticEvent) {
		e.preventDefault();
		if(this.props.curriculum){
			await this.props
				.deleteCurriculumActionMapper(this.props.curriculum.curriculumId)
				.then((e: any) => {
					this.setState({ isLoading: false });
					this.setState({isRedirect: true })
				});
			this.props.deleteCurriculumActionMapper(
				this.props.curriculum.curriculumId
			);
		}
	}
/**
 * This function gets called when the update button is submitted. It calls the 
 *  updateCurriculumActionMapper inside passing a Curriculum
 * @param e As the execution is the result of a click, a SyntheticEvent is 
 * passed to the function
 */
	async submitCurriculum(e: SyntheticEvent) {
		e.preventDefault();
		//TODO
		if (this.state.existSkillList && this.state.existSkillList.length === 0) {
			this.setState({ alert: "Please include at least one skill" }, () =>
				setTimeout(() => this.setState({ alert: "" }), 5000)
			);
		} else {
			this.setState({ isLoading: true });
			const curriculum = new Curriculum(
				this.props.curriculum.curriculumId,
				this.state.name,
				this.state.existSkillList
			);
			await this.props
				.updateCurriculumActionMapper(curriculum)
				.then((e: any) => {
					this.setState({ isLoading: false });
				});
			this.props.getCurriculumByIdActionMapper(
				this.props.curriculum.curriculumId
			);
		}
	}

	/**
	 * This function sets the state for category id, when a user is selecting a skill from the category dropdown menu.
	 * @param e As the execution is the result of a click, a SyntheticEvent is passed to the function
	 */
	handlerCategory(e: any) {
		this.setState({ categoryId: e.target.value });
	}

	/**
	 * This function gets called when the submit button for category is clicked. It calls the getSkillsByCategoryIdActionMapper and passes in the category id. 
	 * @param e As the execution is the result of a click, a SyntheticEvent is passed to the function
	 */
	submitCategory(e: SyntheticEvent) {
		e.preventDefault();
		this.props.getSkillsByCategoryIdActionMapper(this.state.categoryId);
	}

	/**
	 * This method is called when a skill is added. 
	 * @param e As the execution is the result of a click, a SyntheticEvent is passed to the function
	 * @param skill The skill is passed into the function as a param. 
	 */
	handlerAddSkill(e: SyntheticEvent, skill: Skill) {
		const newSkillList = [...this.state.existSkillList, skill].sort(
			(a: Skill, b: Skill) => {
				return a.category.categoryId - b.category.categoryId;
			}
		);
		this.setState({ existSkillList: newSkillList });
		this.setState({
			notExistSkillList: this.state.notExistSkillList.filter(
				(el: Skill) => el.skillId !== skill.skillId
			),
		});
	}

	/**
	 * This function is called when a skill is removed from a curriculum. 
	 * @param e As the execution is the result of a click, a SyntheticEvent is passed to the function
	 * @param skill This param is the skill that get's removed when the function is called. 
	 */
	handlerRemoveSkill(e: SyntheticEvent, skill: Skill) {
		const newNotSkillList = [...this.state.existSkillList, skill];
		this.setState({ notExistSkillList: newNotSkillList });
		this.setState({
			existSkillList: this.state.existSkillList.filter(
				(el: Skill) => el.skillId !== skill.skillId
			),
		});
	}

	/**
	 * This function is called when when the submit button is clickec after all the changes are made. 
	 */
	public updateCurriculumSubmit = () => this.setState((prevState)=>({isShowUpdate:!prevState.isShowUpdate}));
	handlerName(e:any){this.setState({name:e.target.value||undefined})}
	render() {
		return (
					
				<Container className="curriculum-view-update-container">
					{this.state.isRedirect && <Redirect to={"/curriculum"}/> }
						<Row className="p-4 m-4 border border-light shadow-custom text-left rounded bg-light">
							{!this.props.curriculum ? (								
								<Col>
									<h3>No Curriculum found</h3>
								</Col>
							):(
								<React.Fragment>
									<Col lg={12}>
										<h3>
											Curriculum: {this.props.curriculum.curriculumName}
										</h3>
									</Col>
									<Col lg={12}>
										<Button
											onClick={this.submitDeleteCurriculum}
											className="curriculum-view-update-buttons"
											color="danger"
										>
											Delete Curriculum
										</Button>
										<Button
											onClick={this.updateCurriculumSubmit}
											className="curriculum-view-update-buttons"
											color="info"
										>
											Update Curriculum
										</Button>
									</Col>
									{/* <Col>
                                <Card className="curriculum-view-update-card">
                                    <CardTitle><h3 className="curriculum-view-update-left-text">Skills:</h3></CardTitle>
                                    <CardColumns>
                                        {this.props.curriculum.skills.map(skills => <CardText>{skills.skillName}</CardText>)}
                                    </CardColumns>
                                </Card>
                            </Col> */}
									<Col lg={12}>
										<p className="curriculum-view-update-left-text">
											Current curriculum:
										</p>
									</Col>
									{this.props.curriculum.skills.map((skills) => (
										<Card className="curriculum-view-update-card-skills">
											<CardTitle>{skills.skillName}</CardTitle>
										</Card>
									))}
									<Col lg={12}>
										<br />
										<p className="curriculum-view-update-left-text">
											Update curriculum:
										</p>
									</Col>

									{this.state.isShowUpdate &&
									<Col lg={12}>
										<Form>
											<Form>
												<FormGroup>
													<Label className="text-left">
														Enter new name of the Curriculum
													</Label>
													<Input
														type="text"
														onChange={this.handlerName}
														placeholder="Enter the Curriculum Name"
														defaultValue={this.state.name}
													/>
												</FormGroup>
											</Form>

											<Form onSubmit={this.submitCurriculum}>
												<Button
													color="primary"
													type="submit"
													className="my-3 col-sm-12"
												>
													Submit
												</Button>
											</Form>
											<FormGroup>
												<Label className="curriculum-view-update-left-text">
													Category
												</Label>
											</FormGroup>
											{/* This form gets the catagories by dropdown*/}
											<Form inline onSubmit={this.submitCategory}>
												<FormGroup className="col-sm-10 pl-0">
													<Label className="text-align-left col-sm-2">
														Category
													</Label>
													<Input
														type="select"
														name="category"
														className="col-sm-10"
														onChange={this.handlerCategory}
													>
														{this.props.allCategory.map((el: Category) => (
															<option value={el.categoryId}>
																{el.categoryName}
															</option>
														))}
													</Input>
												</FormGroup>
												<Button color="primary" className="col-sm-2">
													Search
												</Button>
											</Form>

											{/* This form gets the Skills by catagories*/}
											<Form className="shadow-custom">
												<FormGroup>
													{this.state.existSkillList.length !== 0 && (
														<React.Fragment>
															<Label>
																Skills Currently in this Curriculum:
															</Label>
															{this.state.existSkillList.map((el: Skill) => (
																<Card
																	style={{
																		backgroundColor: el.category.categoryColor,
																	}}
																>
																	<CardBody>
																		<CardTitle className="text-light font-weight-bold">
																			{el.skillName}
																		</CardTitle>
																		<Button
																			className="text-light font-weight-bold"
																			color="danger"
																			onClick={(e: SyntheticEvent) =>
																				this.handlerRemoveSkill(e, el)
																			}
																		>
																			Remove
																		</Button>
																	</CardBody>
																</Card>
															))}
														</React.Fragment>
													)}
													{this.state.notExistSkillList.length !== 0 && (
														<React.Fragment>
															<Label>
																Skills Currently Not in this Curriculum
															</Label>
															{this.state.notExistSkillList.map((el: Skill) => (
																<Card
																	style={{
																		backgroundColor: el.category.categoryColor,
																	}}
																>
																	<CardBody>
																		<CardTitle className="text-light font-weight-bold">
																			{el.skillName}
																		</CardTitle>
																		<Button
																			className="text-light font-weight-bold"
																			color="primary"
																			onClick={(e: SyntheticEvent) =>
																				this.handlerAddSkill(e, el)
																			}
																		>
																			Add
																		</Button>
																	</CardBody>
																</Card>
															))}
														</React.Fragment>
													)}
												</FormGroup>
											</Form>
										</Form>
									</Col>
									}
								</React.Fragment>
							)}
						</Row>
					</Container>
		)
	}
}
