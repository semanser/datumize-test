import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'

describe('Store', () => {
  it('store created without issues', () => {

		expect(store).toHaveProperty('dispatch')
    expect(store).toHaveProperty('subscribe')
    expect(store).toHaveProperty('getState')
    expect(store).toHaveProperty('replaceReducer')
  })
})

