import React from 'react'
import ReactDOM from 'react-dom'
import * as constants from './constants'

it('name of the constants should be the same as values', () => {
  Object.keys(constants).map(key => {
		expect(key).toEqual(constants[key]);
  })
})

