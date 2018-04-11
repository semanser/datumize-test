import React from 'react'
import ReactDOM from 'react-dom'
import ShallowRenderer from 'react-test-renderer/shallow'
import RoleItem from './RoleItem'

const renderer = new ShallowRenderer()

describe('RoleItem Component', () => {
  it('Renders component without crashing', () => {
    const div = document.createElement('div')
    const props = {
      role: {
        id: 1,
        name: 'Admin',
      }
    }

    const tree = renderer.render(<RoleItem {...props}/>)
    expect(tree).toMatchSnapshot()
  })
})

