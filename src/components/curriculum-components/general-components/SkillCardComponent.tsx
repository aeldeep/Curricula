import React, { SyntheticEvent } from 'react';
import { Skill } from '../../../models/Skill';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';

interface SkillCardProps {
  skill:Skill,
  isAdd:boolean,
  handlerSkill:(e:SyntheticEvent,skill:Skill)=>void
}
/**
 * Component for the viewing skills in curriculum
 * @param {SkillCardProps} props 
 */
export const SkillCardComponent = (props:SkillCardProps) => {
  return (
    <Card key={props.skill.skillId} className="col-4 p-0 border-0">
      <CardBody className="m-2 round" style={{backgroundColor:props.skill.category.categoryColor}}>
        <CardTitle className="text-light text-monospace font-weight-bold">{props.skill.skillName}</CardTitle>
        {props.isAdd?(
          <Button color="primary" onClick={(e:SyntheticEvent)=>props.handlerSkill(e,props.skill)}>Add</Button>
        ):(
          <Button color="danger" onClick={(e:SyntheticEvent)=>props.handlerSkill(e,props.skill)}>Remove</Button>
        )}
      </CardBody>
    </Card>
  )
} 