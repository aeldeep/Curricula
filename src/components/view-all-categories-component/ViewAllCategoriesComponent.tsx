import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardTitle, CardText, Button, Container, Row } from "reactstrap";
import { Category } from "../../models/Category";
import { RouteComponentProps } from "react-router";
import { NavLink, Link } from "react-router-dom";

//prop interface

interface IViewAllUsersProps extends RouteComponentProps {
  allCategory: Category[];
  deletedCategory: any;
  errorMessage: string;
  getAllCategoriesActionMapper: () => void;
  CategoryDeleteByIdActionMapper: (id: number) => void;
}
//state interface?

export class ViewAllCategoriesComponent extends React.Component<
  IViewAllUsersProps,
  any
> {
  // refreshPage() {
  //   window.location.reload(true);
  // }
  componentDidMount() {
    return this.props.getAllCategoriesActionMapper();
  }
  // componentDidUpdate() {
  //   return this.props.getAllCategoriesActionMapper();
  // }

  deleteCategory = async (id: number) => {
   await this.props.CategoryDeleteByIdActionMapper(id);
    this.props.getAllCategoriesActionMapper()
    //this.refreshPage();
  };

  render() {
    let viewCategory = this.props.allCategory.map((category, index) => {
      return (
        <>
        <Card
          key={index}
          body
          inverse
          className="shadow-custom2 col-3"
          style={{
            margin: "1em",
          }}
        >
          <CardTitle style={{ color: "black", fontSize: "2em" }}>
            {category.categoryName}
          </CardTitle>
          <br />
          <br />
          <CardText style={{ color: category.categoryColor, fontSize: "1.2em" }}>
            COLOR: {category.categoryColor} ██
          </CardText>
          <Row className="d-flex justify-content-center">
          
            <Button tag={Link}
          color="info"
            className="col-5 mx-1"
            to={{
              pathname: `/category/${category.categoryId}`,
              state: { category }}}
          >
            
            UPDATE
            
          </Button>
          
          
          <Button className="col-5 mx-1"
            onClick={() => this.deleteCategory(category.categoryId)}
            color = "danger"
          >
            
            {" "}
            DELETE
          </Button>
          </Row>
        </Card>
        </>
      );
    }); // loop
    //onClick={this.deleteCategory(category.categoryId)}
    //this.refreshPage();
    return (
      <>
      
          <h4 style={{ textAlign: "center" }}>All Categories</h4>
        
        <div className="d-flex justify-content-center">
          <Row className="col-8 d-flex justify-content-center">{viewCategory}</Row>
        </div>
      </>
    );
  }
}
