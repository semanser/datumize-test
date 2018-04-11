import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ColorHash from 'color-hash'

class AvatarImage extends Component {
  constructor(props) {
    super(props)

    this.colorHash = new ColorHash()

    this.rolesColors = {
      Admin: '#EA522F',
      Editor: '#8245EA',
			Viewer: '#45EA69',
    }

    this.getShortName = this.getShortName.bind(this)
  }

  getShortName(name) {
    return name.split(' ')
      .map(n=>n[0])
      .join('')
  }

  render() {
    const style = this.props.type === 'role'
      ? {
        border: `2px solid ${this.rolesColors[this.props.name]}`,
        color: this.rolesColors[this.props.name],
      }
      : {
        background: `${this.colorHash.hex(this.props.name)}`,
      }

    const text = this.props.type === 'role'
      ? this.props.name[0]
      : this.getShortName(this.props.name)

    return (
      <div className="icon" style={style}>
        {text}
      </div>
    )
  }
}

AvatarImage.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default AvatarImage

