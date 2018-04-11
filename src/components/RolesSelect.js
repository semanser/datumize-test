import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

const RolesSelect = props => (
  <Select
    className="select"
    name="form-field-name"
    value={props.selectedProjectId}
    clearable={false}
    onChange={selected => {props.changeProject(selected.value)}}
    options={props.projects.map(project => ({
      label: project.name,
      value: project.id,
    }))}
  />
)

export default RolesSelect

