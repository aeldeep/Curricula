import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";

//this is a function component
const NavBarComponent = (props: any) => {
  // useState is a hook
  // hooks are special functions provided by react for doing specific things
  // useState allows us to build a varibale that react keeps track of like state
  // hooks are only available in functions
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
  return (
    <>
    <div></div>
      <Navbar className="py-3 px-5 border-bottom" expand="md">
        {/* PUT TITLE HERE */}
        <NavbarBrand href="/" className="font-weight-bold">Visualization API</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar >
              <DropdownToggle nav caret>
                VISUALIZATIONS
              </DropdownToggle>
              <DropdownMenu right>
                <a className="dropdown-item" href="/">
                  View All Visualizations
                </a>
                <DropdownItem divider />
                <NavLink exact className="dropdown-item" to="/visualization/create">
                  Create A Visualization
                </NavLink>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                CURRICULUMS
              </DropdownToggle>
              <DropdownMenu right>
                <NavLink exact className="dropdown-item" to="/curriculum">
                  View All Curriculums
                </NavLink>
                <DropdownItem divider />
                <NavLink exact className="dropdown-item" to="/curriculum/create">
                  Create A Curriculum
                </NavLink>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                SKILLS
              </DropdownToggle>
              <DropdownMenu right>
                <NavLink exact className="dropdown-item" to="/skills">
                  View All Skills
                </NavLink>
                <DropdownItem divider />
                <NavLink exact className="dropdown-item" to="/skills/create">
                  Create A Skill
                </NavLink>
                <DropdownItem divider />
                <NavLink exact className="dropdown-item" to="/skills/update">
                  Edit A Skill
                </NavLink>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                CATEGORIES
              </DropdownToggle>
              <DropdownMenu right>
                <NavLink exact className="dropdown-item" to="/category">
                  View All Categories
                </NavLink>
                <DropdownItem divider />
                <NavLink exact className="dropdown-item" to="/category/create">
                  Create A Category
                </NavLink>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default NavBarComponent;