import React from 'react'
import ReactDOM from 'react-dom'
import ShallowRenderer from 'react-test-renderer/shallow'
import RolesSelect from './RolesSelect'

const renderer = new ShallowRenderer()

const projects = [
  {
    id: 1,
    name: 'test project 1',
  },
  {
    id: 2,
    name: 'test project 2',
  },
  {
    id: 3,
    name: 'test project 3',
  },
]

describe('RolesSelect Component', () => {
  it('renders component without crashing', () => {
    const div = document.createElement('div')

    const props = {
      projects,
    }

    const tree = renderer.render(<RolesSelect {...props}/>)
    expect(tree).toMatchSnapshot()
  })
})

