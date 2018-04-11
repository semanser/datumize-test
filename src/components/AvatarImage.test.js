import React from 'react'
import ReactDOM from 'react-dom'
import ShallowRenderer from 'react-test-renderer/shallow'
import AvatarImage from './AvatarImage'

const renderer = new ShallowRenderer()

describe('AvatarImage Component', () => {
  it('Renders with type="name" without crashing', () => {
    const div = document.createElement('div')
    const props = {
      name: 'John Doe',
      type: 'name'
    }

    const tree = renderer.render(<AvatarImage {...props}/>)
    expect(tree).toMatchSnapshot()
  })

  it('Renders Admin role correctly', () => {
    const div = document.createElement('div')
    const props = {
      name: 'Admin',
      type: 'role'
    }

    const tree = renderer.render(<AvatarImage {...props}/>)
    expect(tree).toMatchSnapshot()
  })

  it('Renders Editor role correctly', () => {
    const div = document.createElement('div')
    const props = {
      name: 'Editor',
      type: 'role'
    }

    const tree = renderer.render(<AvatarImage {...props}/>)
    expect(tree).toMatchSnapshot()
  })

  it('Renders Viewer role correctly', () => {
    const div = document.createElement('div')
    const props = {
      name: 'Viewer',
      type: 'role'
    }

    const tree = renderer.render(<AvatarImage {...props}/>)
    expect(tree).toMatchSnapshot()
  })
})

