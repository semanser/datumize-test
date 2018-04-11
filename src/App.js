import React, { Component } from 'react'
import './App.css'
import RolesWidget from './containers/RolesWidget'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="page-title">
          Select project below to manage assignments
        </div>
        <RolesWidget />
      </div>
    )
  }
}

export default App
