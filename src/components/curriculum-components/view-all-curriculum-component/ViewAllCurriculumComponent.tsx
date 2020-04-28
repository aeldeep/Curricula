import React from 'react';
import { Container, Card, Row, Col, CardBody, CardTitle, CardText, Alert } from "reactstrap";
import { Curriculum } from '../../../models/Curriculum';
import { Skill } from '../../../models/Skill';
import { NavLink } from 'react-router-dom';

/**
 * Interface for properties of View All Curriculum Component
 */
interface IViewAllCurriculumProps{
  curriculumList:Array<Curriculum>,
  errorMessage:string,
  viewCurriculumListActionMapper:()=>{}
}

/**
 * Component for showing a list of curriculums
 * 
 * @component
 * @version 1.0.0
 * @author [Gerard Cancino](https://github.com/Gerard-Cancino)
 * @author [Charles Perry](https://github.com/perryc85)
 * @author [Nikoloi Ellis](https://github.com/nikoloiellis)
 * @author [Carlos Krugar](https://github.com/carloskruger)
 */
export class ViewAllCurriculumComponent extends React.Component<IViewAllCurriculumProps,any>{
  componentDidMount(){
    this.props.viewCurriculumListActionMapper();
  }
  render(){
    return(
      <Container>
        <Row className="p-4 m-4 border border-light rounded shadow-custom bg-light">
          {this.props.errorMessage && <Alert className="col-12" color="danger">{this.props.errorMessage}</Alert>}
          <Col className="col-12 mb-2">
            <h2 > Curriculum List </h2>
          </Col>
            {this.props.curriculumList && this.props.curriculumList.map((el)=>(
              <Col className="col-4 p-0 mb-3">
                <div className="border-0 shadow h-100 mx-2">
                  <Card className="h-100 border-0">
                    <CardBody className="d-flex flex-column">
                      <CardTitle><h5 className="m-0">{`${el.curriculumName}`}</h5></CardTitle>
                      <div className="py-2">
                        {el.skills && el.skills.sort((a:Skill,b:Skill)=>a.skillName.localeCompare(b.skillName)).map((skill:Skill)=>(
                          <CardText className="rounded-pill m-1" style={{color:skill.category.categoryColor}}>{skill.skillName}</CardText>
                        ))}
                      </div>
                      <div className="mt-auto">
                        <NavLink
                          to={{
                            pathname:`/curriculum/view/${el.curriculumId}`,
                          }} className="w-100 btn btn-primary">View</NavLink>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    )
  }
}