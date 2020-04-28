import { Category } from "../../models/Category";
import { Skill } from "../../models/Skill";
import React, { SyntheticEvent } from "react";
import {
  Form,
  Input,
  DropdownItem,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  Row,
} from "reactstrap";
import { Redirect } from "react-router";

/**
 * this interface declares the action
 * mapppers that will be used in this component
 */
export interface IUpdateSkillProp {
  errorMessage: string;
  allCategory: Category[];
  allSkills: Skill[];
  skillToUpdate: Skill;
  viewAllSkillsActionMapper: () => void;
  updateSkillActionMapper: (
    id: number,
    name: string,
    category: Category
  ) => void;
  getAllCategoriesActionMapper: () => void;
}
export interface IUpdateSkillState {
  skill: Skill;
  category: Category;
  name: string;
  skillLabel: string;
  categoryLabel: string;
}

/**
 * this is a child class of the React.component framework
 * here we take in the state and props that we have provided above and
 * return a updated skill name of our choice
 */


export class UpdateSkillComponent extends React.Component<
  IUpdateSkillProp,
  IUpdateSkillState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      skill: new Skill(0, "", new Category(0, "", "")),
      category: new Category(0, "", ""),
      name: "",
      skillLabel: "Skill",
      categoryLabel: "Category",
    };

    this.updateSkill = this.updateSkill.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.updateSkillName = this.updateSkillName.bind(this);
    this.submit = this.submit.bind(this);
  }

  /**
   * this function will will be involked immediately after the component is mounted
   */
  componentDidMount() {
    return (
      this.props.getAllCategoriesActionMapper(),
      this.props.viewAllSkillsActionMapper()
    );
  }

  /**
   * here when a user clicks the submit button, the skill will be updated and saved to
   * the category that you originally selected
   *  */

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("here");

    this.props.updateSkillActionMapper(
      this.state.skill.skillId,
      this.state.name,
      this.state.category
    );
    /**
     * will cause render() to be called on the component, s
     * kipping shouldComponentUpdate().
     * This will trigger the normal lifecycle methods for child components,
     * including the shouldComponentUpdate() method of each child.
     */
    this.forceUpdate();
  };
  updateSkill = (skill: Skill) => (e: any) => {
    this.setState({
      skill,
      skillLabel: skill.skillName,
    });
  };

  updateCategory = (category: Category) => (e: any) => {
    this.setState({
      category,
      categoryLabel: category.categoryName,
    });
  };

  updateSkillName(e: any) {
    this.setState({ name: e.target.value });
  }

  /**
   * this render method will produce a dropdown selection of categories
   * in which a user can choose a specific category
   * and will be mapped to skills
   */

  render() {
    let dropCategories = this.props.allCategory.map((category) => {
      return (
        <DropdownItem onClick={this.updateCategory(category)}>
          {category.categoryName}
        </DropdownItem>
      );
    });
    let dropSkills = this.props.allSkills.map((skill) => {
      return (
        <DropdownItem onClick={this.updateSkill(skill)}>
          {skill.skillName}
        </DropdownItem>
      );
    });

    return this.props.skillToUpdate.skillId === 0 ? (
      <Form onSubmit={this.submit}>
        <Row className="d-flex justify-content-center">
          <UncontrolledButtonDropdown>
            <DropdownToggle color="info" caret>
              {this.state.skillLabel}
            </DropdownToggle>
            <DropdownMenu>{dropSkills}</DropdownMenu>
          </UncontrolledButtonDropdown>

          <UncontrolledButtonDropdown className="skillDropDown">
            <DropdownToggle color="info" caret>
              {this.state.categoryLabel}
            </DropdownToggle>
            <DropdownMenu className="categoryDropDown">
              {dropCategories}
            </DropdownMenu>
          </UncontrolledButtonDropdown>

          <Input
            onChange={this.updateSkillName}
            className="skillNameInput"
            value={this.state.name}
            type="text"
            placeholder="new name"
          />
        </Row>

        <Button color="primary" className="updateButton">
          Update
        </Button>
      </Form>
    ) : (
      <Redirect to="/skills" />
    );
  }
}

