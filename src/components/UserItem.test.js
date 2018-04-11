import React from 'react'
import ReactDOM from 'react-dom'
import ShallowRenderer from 'react-test-renderer/shallow'
import UserItem from './UserItem'

const renderer = new ShallowRenderer()

describe('UserItem Component', () => {
  it('Renders component without crashing', () => {
    const div = document.createElement('div')
    const props = {
      user: {
        id: 1,
        name: 'John Doe',
        role: 'Admin',
      }
    }

    const tree = renderer.render(<UserItem {...props}/>)
    expect(tree).toMatchSnapshot()
  })

  it('should render the Unassign button if props.onUnassign is passed', () => {
    const div = document.createElement('div')
    const props = {
      user: {
        id: 1,
        name: 'John Doe',
        role: 'Admin',
      },
      onUnassign: () => {},
    }

    const tree = renderer.render(<UserItem {...props}/>)
    expect(tree).toMatchSnapshot()
  })
})

