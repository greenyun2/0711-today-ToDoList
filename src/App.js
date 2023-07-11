import { useState, useRef } from 'react';
import './App.css';
import Header from './Components/Header';
import TodoEditor from './Components/TodoEditor';
import TodoList from './Components/TodoList';
import TestComp from './Components/TestComp';
import { useReducer } from 'react';




function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return [action.newItem, ...state]
    }
    case "UPDATE": {
      return state.map((it) => (
        it.id === action.targetId ? {...it, isDone: !action.isDone} : it
      ))
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.targetId)
    }
    default:
    return state;
  }
  
}


const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "리액트 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    createdDate: new Date().getTime(),
  }
]

function App() {

  const [todo, dispatch] = useReducer(reducer, mockTodo);

  // const [todo, setTodo] = useState(mockTodo);
  // 기본의 아이디가 0,1,2 라서 3이라는 값을 준다
  const idRef = useRef(3);

  const onCreate = (content) => {
    // content = 뭘 해야할지에 대한 내용 : 입력될 값
    dispatch({
      type: "CREATE", 
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    // 변경된 값을 인지하려면 기존에 있는 값에서 바뀌는게 있어야 인지
    // 새로운 아이템이 위로 그 다음 기존에 있던 값이 뒤에 깔려야 한다
    // setTodo([newItem, ...todo]);
    // 누를때마다 새로운 아이디 값 생성해야 하기 때문에
    idRef.current += 1;
  };
  const onUpdate = (targetId) => {
    // setTodo(todo.map((it) => (
    //   it.id === targetId ? {...it, isDone: !it.isDone} : it
    // )))

    // useReducer로 변환
    dispatch({
      type: "UPDATE", 
      targetId, 
    })
  } 

  const onDelete = (targetId) => {
    // setTodo(todo.filter((it) => it.id !== targetId))

    // useReducer로 변환
    dispatch({
      type: "DELETE",
      targetId,
    })
  }

  return (
    <div className="App">
      <TestComp />
      <Header />
      <TodoEditor onCreate={onCreate}/>
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );
}

export default App;
