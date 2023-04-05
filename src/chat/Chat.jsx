// import { useState } from "react";
import React, { useEffect, useRef, useState } from "react";


import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";

import { Message } from "./Message";
import { chatService } from "../services/chatService";

import "./Chat.css";

const DEFAULTVALUE = '';

export const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatReply, setChatReply] = useState(""); // change to array to store more data
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    const inputMessage = {
        sender: "user",
        body: userInput,
      };
    const messagesList = [...messages, inputMessage]
    setMessages(messagesList);
    fetchResponseFromGPT(messagesList);
    setUserInput('');
  }
  const fetchResponseFromGPT = async (messages) => {
    console.log("MAKE API CALL TO FETCH RESPONSE FOR THE CHAT: ", userInput);
    const chatReplyFromAI = await chatService.getMessageReplyFromOpenAi(
      userInput
    );
    setChatReply(chatReplyFromAI);
    setLoading(false);
    const replyObj = {
      sender: "AI",
      body: chatReplyFromAI,
    };
    setMessages([...messages, replyObj]);
  };
  // const messages = [
  //     {
  //       id: 1,
  //       sender: 'John',
  //       time: '2:30pm',
  //       body: 'Hey there!'
  //     },
  //     {
  //       id: 2,
  //       sender: 'Jane',
  //       time: '2:35pm',
  //       body: 'Hi John!'
  //     },
  //     {
  //       id: 3,
  //       sender: 'John',
  //       time: '2:40pm',
  //       body: 'How are you doing?'
  //     },
  //     {
  //       id: 4,
  //       sender: 'Jane',
  //       time: '2:45pm',
  //       body: 'I\'m doing great, thanks for asking!'
  //     }
  //   ];
  return (
    <>
      <div>
        <h1>Healthbot</h1>
        <p> Chatbot powered by openAI CHATGPT</p>
      </div>
      
      <div className="chat-container">
        <div className="chat-messages">
          {/* {messages.map((message) => (
                        <Message key={message.id} {...message} />
                    ))} */}
          {messages.map((message) => {
            if (message.sender === "user") {
              return (
                <div className="chat-message-sent">
                  <p> User: {message.body}</p>
                </div>
              );
            } else {
              return (
                <div className="chat-message-received">
                  <p> {message.sender}: {message.body}</p>
                </div>
              );
            }
          })}

          {/* <Textarea minRows={5} placeholder="Type your message" onChange={(e) =>  { 
                    const { chatReplyy } = e.target; 
                    setChatReply(chatReply);
                    }}/> */}
        </div>
        <div className="chat-input">
          <Textarea
            minRows={3}
            placeholder="Ask your question"
            value={userInput}
            onChange={(e) => {
              const { value } = e.target;
              setUserInput(value);
            }}
          />
          {/* <Textarea minRows={5} placeholder="typng the answer" onChange={(e) =>  { 
                        const { value } = e.target; 
                        setChatReply(value);
                        }}/> */}
          <div id="inputSubmit">
            {loading ? (
              <Button
                loading
                loadingPosition="start"
                className="mt-2"
                color="primary"
                variant="solid"
              >
                Getting Reply
              </Button>
            ) : (
              <Button
                className="mt-2"
                color="primary"
                variant="solid"
                onClick={handleClick}
              >
                Send
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
