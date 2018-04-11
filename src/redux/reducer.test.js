import reducer from './reducer'
import * as constants from './constants'

const defaultState = {
  filteredUsers: [],
  isFetching: true,
  mode: 'default',
  selectedProjectId: null,
  selectedRoleId: null,
  selectedUserId: null,
}

describe('Reducer', () => {
  it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(defaultState)
  })

  it('should handle CHANGE_PROJECT', () => {
    const action = {
      type: constants.CHANGE_PROJECT,
      payload: {
        projectId: 2,
      },
    }
    const expectedState = Object.assign({}, defaultState, {
      selectedProjectId: 2,
    })

    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  it('should handle ASSIGN_USER', () => {
    const assignment = {
      projectId: 1,
      roleId: 1,
      userId: 1,
    }

    const startState = {
      assignments: [
        {
          projectId: 2,
          roleId: 2,
          userId: 2,
        },
      ]
    }

    const expectedState = {
      assignments: [
        {
          projectId: 2,
          roleId: 2,
          userId: 2,
        },
        {
          projectId: 1,
          roleId: 1,
          userId: 1,
        },
      ]
    }

    const action = {
      type: constants.ASSIGN_USER,
      payload: {
        assignment,
        status: 200,
      },
    }

    expect(reducer(startState, action)).toEqual(expectedState)
  })

  it('should handle UNASSIGN_USER', () => {
    const assignment = {
      projectId: 1,
      roleId: 1,
      userId: 1,
    }

    const startState = {
      assignments: [
        {
          projectId: 2,
          roleId: 2,
          userId: 2,
        },
        {
          projectId: 1,
          roleId: 1,
          userId: 1,
        },
      ]
    }

    const expectedState = {
      assignments: [
        {
          projectId: 2,
          roleId: 2,
          userId: 2,
        },
      ]
    }

    const action = {
      type: constants.UNASSIGN_USER,
      payload: {
        assignment,
        status: 200,
      },
    }

    expect(reducer(startState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_DATA_REQUEST', () => {
    const action = {
      type: constants.FETCH_DATA_REQUEST,
    }

    const startState = {
      isFetching: false,
    }

    const expectedState = {
      isFetching: true,
    }

    expect(reducer(startState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_DATA_RECEIVE', () => {
    const action = {
      type: constants.FETCH_DATA_RECEIVE,
      payload: {
        assignments: [
          {
            projectId: 1,
            roleId: 1,
            userId: 1,
          },
        ],
        isFetching: false,
        projects: [
          {
            id: 1,
            name: 'Test Project',
          },
        ],
        roles: [
          {
            id: 1,
            name: 'Test Role',
          }
        ],
        selectedProjectId: 1,
        users: [
          {
            id: 1,
            name: 'Test user',
          },
        ],
      }
    }

    const startState = {
      assignments: [],
      isFetching: true,
      projects: [],
      roles: [],
      selectedProjectId: null,
      users: [],
    }

    const expectedState = {
      assignments: action.payload.assignments,
      isFetching: false,
      projects: action.payload.projects,
      roles: action.payload.roles,
      selectedProjectId: 1,
      users: action.payload.users,
    }

    expect(reducer(startState, action)).toEqual(expectedState)
  })

  it('should handle CHANGE_MODE with default value', () => {
    const action = {
      type: constants.CHANGE_MODE,
      payload: {
        mode: undefined,
      },
    }

    const startState = {
      mode: 'select-user',
    }

    const expectedState = Object.assign({}, defaultState, {
      mode: 'default',
    })

    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  it('should handle CHANGE_MODE', () => {
    const action = {
      type: constants.CHANGE_MODE,
      payload: {
        mode: 'select-user',
      }
    }

    const startState = {
      mode: 'default',
    }

    const expectedState = Object.assign({}, defaultState, {
      mode: 'select-user',
    })

    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  it('should handle FILTER_USERS with mode=default', () => {
    const action = {
      type: constants.FILTER_USERS,
    }

    const startState = {
      mode: 'default',
      users: [
        {
          id: 1,
          name: 'Test name 1',
        },
        {
          id: 2,
          name: 'Test name 2',
        },
      ],
      roles: [
        {
          id: 1,
          name: 'Admin',
        },
      ],
      filteredUsers: [],
      selectedProjectId: 1,
      assignments: [
        {
          projectId: 1,
          roleId: 1,
          userId: 1,
        },
      ],
    }

    const expectedState = Object.assign({}, startState, {
      filteredUsers: [
        {
          id: 1,
          name: 'Test name 1',
          role: 'Admin',
        },
      ],
    })

    expect(reducer(startState, action)).toEqual(expectedState)
  })

  it('should handle FILTER_USERS with mode=select-user', () => {
    const action = {
      type: constants.FILTER_USERS,
    }

    const startState = {
      mode: 'select-user',
      users: [
        {
          id: 1,
          name: 'Test name 1',
        },
        {
          id: 2,
          name: 'Test name 2',
        },
      ],
      roles: [
        {
          id: 1,
          name: 'Admin',
        },
      ],
      filteredUsers: [],
      selectedProjectId: 1,
      assignments: [
        {
          projectId: 1,
          roleId: 1,
          userId: 1,
        },
      ],
    }

    const expectedState = Object.assign({}, startState, {
      filteredUsers: [
        {
          id: 2,
          name: 'Test name 2',
        },
      ],
    })

    expect(reducer(startState, action)).toEqual(expectedState)
  })

  it('should handle USER_SELECT', () => {
    const action = {
      type: constants.USER_SELECT,
      payload: { userId: 2 }
    }

    const startState = {
      selectedUserId: 1,
    }

    const expectedState = Object.assign({}, startState, {
      selectedUserId: 2,
    })

    expect(reducer(startState, action)).toEqual(expectedState)
  })
})

