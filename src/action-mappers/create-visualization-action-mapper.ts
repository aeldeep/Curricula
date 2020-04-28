
import { Dispatch } from "redux";
import { createVisualization } from "../remote/visualization-remote";


export const visualizationCreateTypes = {
  CREATE_VISULIZATION: "VISULIZATION_CREATE_VISULIZATION",
  FAILED_TO_CREATE_VISULIZATION: "VISULIZATION_FAILED_TO_CREATE_VISULIZATION"
}

export const createVisualizationActionMapper = (n:string,c:Array<any>) => async (dispatch:Dispatch) => {
  try{
    let response = await createVisualization(n,c);
    dispatch({
      type:visualizationCreateTypes.CREATE_VISULIZATION,
      payload:{
        response
      }
    })
    dispatch({
      type:visualizationCreateTypes.FAILED_TO_CREATE_VISULIZATION,
      payload:{
        response
      }
    })
  }
  catch(e){
 
  }
}