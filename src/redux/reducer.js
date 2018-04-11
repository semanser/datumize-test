import * as constants from './constants'

const defaultState = {
  filteredUsers: [],
  isFetching: true,
  mode: 'default',
  selectedProjectId: null,
  selectedUserId: null,
  selectedRoleId: null,
}

const reducer = (state = defaultState, action) => {
  const { payload } = action

  switch(action.type) {
    case constants.CHANGE_PROJECT:
      return Object.assign({}, state, { selectedProjectId: payload.projectId })

    case constants.ASSIGN_USER:
      if (payload.status === 200) {
        return Object.assign({}, state, {
          assignments: [...state.assignments, payload.assignment],
        })
      }
      // show the error message here on the application level

      // eslint-disable-next-line
    case constants.UNASSIGN_USER:
      if (payload.status === 200) {
        return Object.assign({}, state, {
          assignments: state.assignments.filter(assignment =>
            !(assignment.projectId === payload.assignment.projectId &&
            assignment.userId === payload.assignment.userId)
          )
        })
      }
      // show the error message here on the application level

      // eslint-disable-next-line
    case constants.FETCH_DATA_REQUEST:
      return Object.assign({}, state, { isFetching: true })

    case constants.FETCH_DATA_RECEIVE:
      return Object.assign({}, state, {
        assignments: payload.assignments,
        isFetching: false,
        projects: payload.projects,
        roles: payload.roles,
        selectedProjectId: payload.projects[0].id,
        users: payload.users,
      })

    case constants.FILTER_USERS:
      const filteredUsers = []

      if (state.mode ==='default') {
        state.users.forEach(user => {
          const index = state.assignments.findIndex(assignment =>
            assignment.userId === user.id &&
            assignment.projectId === state.selectedProjectId
          )

          if (index !== -1) {
            filteredUsers.push(
              Object.assign({}, user,
                {
                  role: state.roles.find(role => role.id === state.assignments[index].roleId).name,
                }
              )
            )
          }
        })
      }

      if (state.mode === 'select-user') {
        state.users.forEach(user => {
          const index = state.assignments.findIndex(assignment =>
            assignment.userId === user.id &&
            assignment.projectId === state.selectedProjectId
          )

          if (index === -1) filteredUsers.push(user)
        })
      }

      return Object.assign({}, state, { filteredUsers })

    case constants.CHANGE_MODE:
      if (payload.mode) {
        return Object.assign({}, state, { mode: payload.mode })
      } else {
        return Object.assign({}, state, { mode: 'default' })
      }

    case constants.USER_SELECT:
      return Object.assign({}, state, {
        selectedUserId: payload.userId,
      })

    default:
      return state
  }
}

export default reducer

