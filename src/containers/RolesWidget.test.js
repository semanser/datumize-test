import React from 'react'
import ReactDOM from 'react-dom'
import ShallowRenderer from 'react-test-renderer/shallow'
import { RolesWidget } from './RolesWidget'

const renderer = new ShallowRenderer()

const props = {
  projects: [
    {
      id: 1,
      name: 'Test project 1',
    },
    {
      id: 2,
      name: 'Test project 2',
    },
  ],
  users: [
    {
      id: 1,
      name: 'test user 1',
    },
    {
      id: 2,
      name: 'test user 2',
    },
  ],
  selectedProjectId: 1,
  selectedUserId: 1,
  assignUser: () => {},
  changeMode: () => {},
  selectUser: () => {},
  unassignUser: () => {},
  filteredUsers: [
    {
      id: 1,
      name: 'test user 1',
    },
  ],
  roles: [
    {
      id: 1,
      name: 'Admin',
    },
    {
      id: 2,
      name: 'Editor',
    }
  ],
}

describe('RolesWidget', () => {
  it('Renders component without crashing', () => {
    const div = document.createElement('div')
    const tree = renderer.render(<RolesWidget {...props}/>)
    expect(tree).toMatchSnapshot()
  })

  it('should render loader if props.isFetching', () => {
    const div = document.createElement('div')
    const tree = renderer.render(<RolesWidget {...Object.assign({}, props, { isFetching: true })}/>)
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with props.mode === "default"', () => {
    const div = document.createElement('div')
    const tree = renderer.render(<RolesWidget {...Object.assign({}, props, { mode: "default" })}/>)
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with props.mode === "select-user"', () => {
    const div = document.createElement('div')
    const tree = renderer.render(<RolesWidget {...Object.assign({}, props, { mode: "select-user" })}/>)
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with props.mode === "select-role"', () => {
    const div = document.createElement('div')
    const tree = renderer.render(<RolesWidget {...Object.assign({}, props, { mode: "select-role" })}/>)
    expect(tree).toMatchSnapshot()
  })
})

