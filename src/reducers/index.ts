import { combineReducers } from "redux";
import { Curriculum } from "../models/Curriculum";
import { Skill } from "../models/Skill";
import { skillsReducer } from "./skills-reducers";
import { categoriesReducer } from "./category-reducer";
import { createReducer } from "./create-category-reducer";
import { Category } from "../models/Category";
import { Visualization } from "../models/Visualization";
import { visualizationReducer } from "./visualization-reducer";
import { curriculumReducer } from './curriculum-reducer';
import { getSkillsByCategoryIdReducer } from "./get-skill-category-reducer";
import { deleteCategoryByIdReducer } from "./delete-category-by-id-reducer";
import { createVisualizationReducer } from "./create-visualization-reduser";



export interface IAllCurriculumState {
	curriculumList: Array<Curriculum>;
	errorMessage: string;
}
export interface ICreateSkillState {
	createdSkill: Skill;
	listCategories: Category[];
	errorMessage: string;
}

export interface IGetSkillsByCategoryIdState {
	skillsByCategoryId: Skill[];
	errorMessage: string;
}

export interface ISkillState {
	createdSkill: Skill;
	allSkills: Skill[];
	updatedSkill: Skill;
	errorMessage: string;
}

export interface ICurriculumState {
  createCurriculum: Curriculum;
  curriculum: Curriculum;
  curriculumList: Array<Curriculum>;
  updateCurriculum: Curriculum;
	deleteCurriculum: Curriculum;
  errorMessage: string;
}

export interface ICreateCategoryState {
  //createCategory:Category
  createCat: Category;
  errorMessage: string;
}

export interface ICategoriesState {
	allCategory: [];
	updatedCategory: Category;
	errorMessage: string;
}

export interface ICategoriesState {
  allCategory: [];
  errorMessage: string;
}

export interface IViewAllVisualizationsState{
  allVisualizations:Visualization[]
  errorMessage: string
}

export interface IViewCurriculumState {
  updateCurriculum: Curriculum;
  errorMessage: string;
}
export interface ICategoriesState {
	allCategory: [];
	errorMessage: string;
}

export interface IDeleteCategoryByIdState {
  deleteCategoryById: any;
  errorMessage: string;
}

export interface IGetCurriculumByIdState {
	getCurriculumById: Curriculum;
	errorMessage: string;
}

export interface ICreateVIsualizationState {
  createVIsualization: Visualization;
  errorMessage: string;
}

export interface IViewAllVisualizationsState {
	allVisualizations: Visualization[];
	errorMessage: string;
	visualization: Visualization;
}


export interface IState {
	//getAllSkills:IGetAllSkillState
	// TODO add to curriculum reducer
  skillsByCategoryId: IGetSkillsByCategoryIdState;
  allCategory: ICategoriesState;
  skills: ISkillState;
  curriculum: ICurriculumState;
  allVisualizations: IViewAllVisualizationsState;
  deleteCategoryById: IDeleteCategoryByIdState;
	newVisualization:ICreateVIsualizationState;
  createCategory: ICreateCategoryState;
}

export const state = combineReducers<IState>({

	//getAllSkills:getAllSkillsReducer,
	// TODO add to curriculum reducer
  skillsByCategoryId: getSkillsByCategoryIdReducer,
  allCategory: categoriesReducer,
  skills: skillsReducer,
  curriculum: curriculumReducer,
  allVisualizations: visualizationReducer,
  deleteCategoryById: deleteCategoryByIdReducer,
  createCategory: createReducer,
  newVisualization: createVisualizationReducer,
});

