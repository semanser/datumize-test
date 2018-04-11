import React, { Component } from 'react'
import AvatarImage from './AvatarImage'

class UserItem extends Component {
  constructor(props) {
    super(props)

    this.state = { hovered: false }

    this.onClickHandler = this.onClickHandler.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onMouseEnter() {
    this.setState({ hovered: true })
  }

  onMouseLeave() {
    this.setState({ hovered: false })
  }

  onClickHandler() {
    if (this.props.onSelect) {
      this.props.onSelect()
    }
  }

  render() {
    let button
    if (this.props.onUnassign) {
      button = this.state.hovered
        ? <div className="role unassign" onClick={this.props.onUnassign}>Unassign</div>
        : <div className="role">{this.props.user.role}</div>
    } 

    return (
      <div
        className="roles-item"
        onClick={this.onClickHandler}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <AvatarImage type="user" name={this.props.user.name}/>
        <div className="text">{this.props.user.name}</div>
        {button}
      </div>
    )
  }
}

export default UserItem

