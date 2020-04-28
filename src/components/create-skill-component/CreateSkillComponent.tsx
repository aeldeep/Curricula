import { Skill } from "../../models/Skill";
import { Category } from "../../models/Category";
import {
  Input,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Button,
  Row,
} from "reactstrap";
import React, { SyntheticEvent } from "react";
import { Redirect } from "react-router";

/**
 * this interface declares the action
 * mapppers that will be used in this component
 */
export interface ICreateSkillProps {
  createdSkill: Skill;
  allCategory: Category[];
  errorMessage: string;
  createSkillActionMapper: (n: string, c: Category) => void;
  getAllCategoriesActionMapper: () => void;
}

export interface ICreateSkillState {
  skillName: string;
  category: Category;
  label: string;
}


/**
 * this is a child class of the React.component framework
 * here we take in the state and props that we have provided above and
 * return a skill name of our choice we want to create and attach it to
 * a category
 */
export class CreateSkillComponent extends React.Component<
  ICreateSkillProps,
  ICreateSkillState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      skillName: "",
      category: new Category(0, "", ""),
      label: "Category",
    };
  }
  /**
   * this function will will be involked immediately after the component is mounted
   * and will list out all of the categories that a skill can be attached to
   */
  componentDidMount() {
    return this.props.getAllCategoriesActionMapper();
  }

  /**
   * here when a user clicks the submit button, the skill and category will be updated
   *  */

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    this.props.createSkillActionMapper(
      this.state.skillName,
      this.state.category
    );
  };

  updateSkillName = (e: any) => {
    this.setState({
      skillName: e.currentTarget.value,
    });
  };

  updateCategory = (category: Category) => (e: any) => {
    this.setState({
      category,
      label: category.categoryName,
    });
  };

  /**
   * this render method will produce a dropdown selection of categories
   * in which a user can choose a specific category
   * and will be mapped to skills
   */

  render() {
    let view = this.props.allCategory.map((category) => {
      return (
        <DropdownItem onClick={this.updateCategory(category)}>
          {category.categoryName}
        </DropdownItem>
      );
    });
    return this.props.createdSkill.skillId === 0 ? (
      <>
        <Form onSubmit={this.submit}>
          <Row>
            <Input
              onChange={this.updateSkillName}
              className="skillNameInputCreate"
              value={this.state.skillName}
              type="text"
              placeholder="skill name"
              required
            />
            <UncontrolledButtonDropdown size="sm">
              <DropdownToggle color="info" caret>
                {this.state.label}
              </DropdownToggle>
              <DropdownMenu className="categoryDropDown">{view}</DropdownMenu>
            </UncontrolledButtonDropdown>
          </Row>
          <Button color="primary" className="createButton">
            Create
          </Button>
        </Form>
      </>
    ) : (
      <Redirect to="/skills" />
    );
  }
}

