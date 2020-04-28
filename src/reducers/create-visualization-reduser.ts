import {  ICreateVIsualizationState } from ".";
import { AnyAction } from "redux";
import { visualizationCreateTypes } from "../action-mappers/create-visualization-action-mapper";
import { Visualization } from "../models/Visualization";


const initialState: ICreateVIsualizationState={
    createVIsualization: new Visualization(0,'',[]),
    errorMessage:''
  }
    
export const createVisualizationReducer = (state = initialState, action:AnyAction) =>{
    switch(action.type){
    
        case visualizationCreateTypes.CREATE_VISULIZATION:{
            return{
                ...state,
                createVIsualization:action.payload.createVIsualization
            }
        }
        case visualizationCreateTypes.FAILED_TO_CREATE_VISULIZATION:{
            return{
                ...state,
                errorMessage:'Failed to create Visualization'
            }
        }
        default:
            return state
    }
}