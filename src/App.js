import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chat } from './chat/Chat';
//import {configuration} from 'openai'
//import { useState } from 'react';
//import openai from 'openai';
//import ReactDOM from 'react-dom/Client';
// import logo from './logo.svg';
//import './App.css';

function App() {
  // const [ChatbotResponse , setCbResponse] = useState('');
  // const [userInput, setUserInput] = useState('');
  // const [isLoading, setIloading] = useState('');
  // const key = process.env.REACT_APP_OPENAPI_KEY
  // console.log('-->> ', key);
  // console.log('Returned response - ', response);
    return (
    <Container className = 'mt-3'>
      <Chat/>
    </Container>
  );
  }

  export default App;

  
