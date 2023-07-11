import React from 'react'
import './TodoEditor.css'
import { useState, useRef } from 'react'

const ToDoEditor = ({ onCreate }) => {
  const [content, setContent] = useState('');

  const inputRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  const onSubmit = () => {
    if(!content) {
      // 메서드 채이닝 기법 = 객체 뒤에 메서드가 여러개 온다
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };

  const onKeyDown = (e) => {  
    // 엔터의 키코드는 13번
    if(e.keyCode === 13) {
      onSubmit();
    }
  }

  return (
    <div className='todoEditor'>
      <h4>새로운 ToDo작성하기 ✒</h4>
      <div className='editor_wrapper'>
        <input 
        ref={inputRef}
        value={content} 
        onKeyDown={onKeyDown}
        onChange={onChangeContent} 
        placeholder='새로운 Todo ...' 
        />
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  )
}

export default ToDoEditor;