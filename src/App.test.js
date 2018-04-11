import React from 'react'
import ReactDOM from 'react-dom'
import ShallowRenderer from 'react-test-renderer/shallow'
import App from './App'

const renderer = new ShallowRenderer()

describe('App Component', () => {
  it('Renders component without crashing', () => {
    const div = document.createElement('div')
    const tree = renderer.render(<App />)
    expect(tree).toMatchSnapshot()
  })
})

