import * as constants from './constants'
import MockFetch from 'mock-fetch-api'
import data from '../data.json'

// Helper function to simulate network delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

MockFetch.when('GET', 'data.json').respondWith(200, JSON.stringify(data))
MockFetch.when('POST', '/assignUser').respondWith(200)
MockFetch.when('POST', '/unassignUser').respondWith(200)

export const fetchData = () => dispatch => {
  dispatch({ type: constants.FETCH_DATA_REQUEST })

  return delay(1500).then(() => 
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: constants.FETCH_DATA_RECEIVE,
        payload: {
          assignments: data.assignments,
          isFetching: false,
          projects: data.projects,
          roles: data.roles,
          users: data.users,
        },
      })

      dispatch(filterUsers())
    })
  )
}

export const assignUser = (userId, roleId, projectId) => dispatch => {
  return fetch('/assignUser', {
    method: 'POST',
    body: JSON.stringify({ userId, roleId, projectId })
  })
    .then(response => {
      dispatch({
        type: constants.ASSIGN_USER,
        payload: {
          assignment: {
            userId,
            roleId,
            projectId,
          },
          status: response.status,
        },
      })

      dispatch(changeMode('default'))
    })
} 

export const unassignUser = (userId, projectId) => dispatch => {
  return fetch('/unassignUser', {
    method: 'POST',
    body: JSON.stringify({ userId, projectId })
  })
    .then(response => {
      dispatch({
        type: constants.UNASSIGN_USER,
        payload: {
          assignment: {
            userId,
            projectId,
          },
          status: response.status,
        },
      })

      dispatch(filterUsers())
    })
}

export const changeProject = projectId => dispatch => {
  dispatch({
    type: constants.CHANGE_PROJECT,
    payload: { projectId },
  })

  dispatch(filterUsers())
}

export const selectUser = userId => dispatch => {
  dispatch({
    type: constants.USER_SELECT,
    payload: { userId },
  })

  dispatch(changeMode('select-role'))
}

export const changeMode = mode => dispatch => {
  dispatch({
    type: constants.CHANGE_MODE,
    payload: { mode },
  })

  dispatch(filterUsers())
}

export const filterUsers = () => ({ type: constants.FILTER_USERS })

