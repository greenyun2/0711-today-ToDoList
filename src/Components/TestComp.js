import React from 'react'
import { useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case "INCREASE":
      return state + action.data;
    case "DECREASE":
      return state - action.data;
    case "INIT":
      return 0;
      default:
        return state;
  }
  
}

const TestComp = () => {
  const [count, dispatch] = useReducer(reducer, 0)
  return (
    <div>
      <h4>Test Components</h4>
      <div>
        <h1>{count}</h1>
      </div>
      <div>
        <button onClick={() => dispatch({type: "INCREASE", data: 1})}>+</button>
        <button onClick={() => dispatch({type: "DECREASE", data: 1})}>-</button>
        <button onClick={() => dispatch({type: "INIT" })}>0으로 초기화</button>
      </div>
    </div>
  )
}

export default TestComp;