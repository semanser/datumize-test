import React from 'react'
import AvatarImage from './AvatarImage'

const RoleItem = props => (
  <div className="roles-item" onClick={props.onSelect}>
    <AvatarImage type="role" name={props.role.name}/>
    <div className="text">{props.role.name}</div>
  </div>
)

export default RoleItem

