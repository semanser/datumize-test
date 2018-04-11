import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GridLoader } from 'halogenium'

import * as actions from '../redux/actions'

import RolesSelect from '../components/RolesSelect'
import RoleItem from '../components/RoleItem'
import UserItem from '../components/UserItem'

export class RolesWidget extends Component {
  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    if (this.props.isFetching) {
      return (
        <div className="widget">
          <GridLoader color="#5E85E7" size="10px" margin="2px" className="loader"/>
        </div>
      )
    }

    const currentProject = this.props.projects.find(p => p.id === this.props.selectedProjectId)

    return (
      <div className="widget">
        {this.props.mode === 'default'
            ? <RolesSelect {...this.props}/>
            : <div className="header">
              <div className="title">{currentProject.name}</div>
              <div className="description">
                {this.props.mode === 'select-user'
                    ? 'Select the user below'
                    : `Now select the role for ${this.props.users.find(user => user.id === this.props.selectedUserId).name}` }
              </div>
            </div>
        }     

        {this.props.mode === 'default' &&
            this.props.filteredUsers.map(user =>
              <UserItem
                user={user}
                onUnassign={this.props.unassignUser.bind(this, user.id, this.props.selectedProjectId)}
                key={user.id}
              />
            )
        }

        {this.props.mode === 'select-user' &&
            this.props.filteredUsers.map(user =>
              <UserItem
                user={user}
                onSelect={this.props.selectUser.bind(this, user.id)}
                key={user.id}
              />
            )
        }

        {this.props.mode === 'select-role' &&
            this.props.roles.map(role =>
              <RoleItem
                role={role}
                key={role.id}
                onSelect={this.props.assignUser.bind(this, this.props.selectedUserId, role.id, this.props.selectedProjectId)}
              />
            )
        }

        {this.props.mode === 'default'
            ? <button className="assign" onClick={this.props.changeMode.bind(this, 'select-user')}>
              Assign more
            </button>
            : <button className="assign" onClick={this.props.changeMode.bind(this, null)}>
              Cancel
            </button>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filteredUsers: state.filteredUsers,
  isFetching: state.isFetching,
  mode: state.mode,
  projects: state.projects,
  roles: state.roles,
  selectedProjectId: state.selectedProjectId,
  selectedUserId: state.selectedUserId,
  users: state.users,
})

const mapDispatchToProps = dispatch => ({
  assignUser: (userId, roleId, projectId) => {dispatch(actions.assignUser(userId, roleId, projectId))},
  changeMode: mode => {dispatch(actions.changeMode(mode))},
  changeProject: id => {dispatch(actions.changeProject(id))},
  fetchData: () => {dispatch(actions.fetchData())},
  selectUser: userId => {dispatch(actions.selectUser(userId))},
  unassignUser: (userId, projectId) => {dispatch(actions.unassignUser(userId, projectId))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RolesWidget)

