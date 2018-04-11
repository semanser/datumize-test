import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from '../redux/actions'
import * as constants from '../redux/constants'
import data from '../data.json'
 
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
 
describe('Action creators', () => {
  it('should create action to change project', () => {
    const projectId = 1

    const expectedActions = [
      {
        type: constants.CHANGE_PROJECT,
        payload: { projectId },
      },
      { type: constants.FILTER_USERS }
    ]

    const store = mockStore({ selectedProjectId: 0 })

    store.dispatch(actions.changeProject(projectId))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should create action to change mode', () => {
    const mode = 'select-user'

    const expectedActions = [
      {
        type: constants.CHANGE_MODE,
        payload: { mode },
      },
      { type: constants.FILTER_USERS }
    ]

    const store = mockStore({ mode: 'default' })

    store.dispatch(actions.changeMode(mode))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should create action to filter users', () => {
    const expectedAction = {
      type: constants.FILTER_USERS,
    }

    expect(actions.filterUsers()).toEqual(expectedAction)
  })
})

describe('async action creators', () => {
	afterEach(() => {
		fetchMock.reset()
		fetchMock.restore()
	})

  it('should create action to fetch data', () => {
		fetchMock
			.getOnce('data.json', { body: data })

    const expectedActions = [
      { type: constants.FETCH_DATA_REQUEST },
      { type: constants.FETCH_DATA_RECEIVE,
        payload: {
          assignments: data.assignments,
          isFetching: false,
          projects: data.projects,
          roles: data.roles,
          users: data.users,
        },
      },
      { type: constants.FILTER_USERS }
    ]
    const store = mockStore({ })

    return store.dispatch(actions.fetchData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create action to assign user', () => {
    const userId = 1
    const roleId = 1
    const projectId = 1

    fetchMock
      .postOnce('/assignUser', { body: data, status: 200 })

    const expectedActions = [
      {
        type: constants.ASSIGN_USER,
        payload: {
          assignment: {
            userId,
            roleId,
            projectId,
          },
          status: 200,
        },
      },
      {
        type: constants.CHANGE_MODE,
        payload: {
          mode: 'default',
        },
      },
      {
        type: constants.FILTER_USERS,
      },
    ]
    const store = mockStore({ })

    return store.dispatch(actions.assignUser(userId, roleId, projectId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create action to unassign user', () => {
    const userId = 1
    const projectId = 1

    fetchMock
      .postOnce('/unassignUser', { body: data, status: 200 })

    const expectedActions = [
      {
        type: constants.UNASSIGN_USER,
        payload: {
          assignment: {
            userId,
            projectId,
          },
          status: 200,
        },
      },
      {
        type: constants.FILTER_USERS,
      },
    ]
    const store = mockStore({ })

    return store.dispatch(actions.unassignUser(userId, projectId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create action to select the user', () => {
    const userId = 1
    const expectedActions = [
      {
        type: constants.USER_SELECT,
        payload: { userId },
      },
      {
        type: constants.CHANGE_MODE,
        payload: { mode: 'select-role' }
      },
      { type: constants.FILTER_USERS }
    ]

    const store = mockStore({})

    store.dispatch(actions.selectUser(userId))
    expect(store.getActions()).toEqual(expectedActions)
  })
})

