import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { store } from "./Store";
import { Provider } from "react-redux";
import CreateCurriculumFormComponent from "./components/curriculum-components/create-curriculum-form-component/CreateCurriculumFormContainer";
import ViewAllCurriculumComponent from "./components/curriculum-components/view-all-curriculum-component/ViewAllCurriculumContainer";
import ViewAllSkillsComponent from "./components/view-all-skill-component/ViewAllSkillsComponent";
import CreateSkillComponent from "./components/create-skill-component/CreateSkillContainer";
import UpdateSkillComponent from "./components/update-skill-component/UpdateSkillContainer";
import NavBarComponent from "./components/navbar-component/NavbarComponent";
import { MultiRouteCategoryComponent } from "./components/multi-route-category-component/MultiRouteCategoryComponent";
import ViewAllVisualizationComponent from "./components/visualization-components/view-all-visualization-component/ViewAllVisualizationContainer";
import ViewAndUpdateVisualizationComponent from "./components/visualization-components/update-view-visualization-components/ViewAndUpdateVisualizationContainer";
import ViewAndUpdateCurriculumComponent from "./components/curriculum-components/view-and-update-curriculum-component/ViewAndUpdateCurriculumContainer";
import CreateVisualizationComponent from "./components/visualization-components/create-visualization-component/CreateVisualizationContainer";

function App() {
  return (
    <Provider store={store}>
      {/* Remove once App.test.tsx is fixed*/}
      <div className="App">
        <Router>
          <NavBarComponent />
          <Switch>
            <Route
              exact
              path="/curriculum/create"
              component={CreateCurriculumFormComponent}
            />
            <Route
              exact
              path="/curriculum/view/:id"
              component={ViewAndUpdateCurriculumComponent}
            />
            <Route
              exact
              path="/skills/update"
              component={UpdateSkillComponent}
            />
            <Route
              exact
              path="/curriculum"
              component={ViewAllCurriculumComponent}
            />
            <Route
              exact
              path="/skills/create"
              component={CreateSkillComponent}
            />
            <Route exact path="/skills" component={ViewAllSkillsComponent} />
            <Route path="/category" component={MultiRouteCategoryComponent} />
            <Route
              exact
              path="/visualization/create"
              component={CreateVisualizationComponent}
            />
            <Route
              exact
              path="/visualization/:id"
              component={ViewAndUpdateVisualizationComponent}
            />
            <Route exact path="/" component={ViewAllVisualizationComponent} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
