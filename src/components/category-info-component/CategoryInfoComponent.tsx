import React from "react";
import { Card, CardTitle, CardText, Button } from "reactstrap";
import { Category } from "../../models/Category";

interface ICategoryInfoProps {
  currentCategory: Category;
}

export class CategoryInfoComponent extends React.Component<
  ICategoryInfoProps,
  any
> {
  render() {
    const currentCategory = this.props.currentCategory;
    return currentCategory.categoryId ? (
      <Card
        body
        inverse
        style={{
          backgroundColor: currentCategory.categoryColor,
          borderColor: "#333",
          margin: "1em",
          width: "20vw",
          height: "40vh"
        }}
      >
        <CardTitle style={{ color: "black", fontSize: "2em" }}>
          {currentCategory.categoryName}
        </CardTitle>
        <br />
        <br />
        <br />
        <CardText style={{ color: "black", fontSize: "1.2em" }}>
          COLOR: {currentCategory.categoryColor}
        </CardText>
        <Button
          style={{
            backgroundColor: "#464646",
            fontSize: "2em",
            color: "black"
          }}
        >
          {" "}
          DELETE
        </Button>
      </Card>
    ) : (
      <></>
    );
  }
}
