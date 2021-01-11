import React from 'react';
import './App.css';
import SimpleMentionEditor from './editor';

function App() {
  const getEditorValue = (value: any) => {
    console.log('value: ', value)
  }
  return (
    <div className="App">
      <SimpleMentionEditor placeholder="Add the content of your snippet"
          getValue={getEditorValue}
          value={'hello world'}/>
    </div>
  );
}

export default App;
