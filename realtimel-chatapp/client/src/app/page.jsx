"use client";

import io from "socket.io-client";
import styles from "./Home.module.css";
import { useState } from "react";

const socket = io("http://localhost:5001");

export default function Home() {
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);

  const handleSendMessage = () => {
    socket.emit("send_message", { message: message });
    setMessage("");
  };

  socket.on("res_message",(data)=>{
    setList([...list,data])
})


      return (
    <main className={styles.container}>
      <div className={styles.container}>
        <h2>チャットアプリ</h2>
        <div className={styles.chatInputButton}>
          <input
            type="text"
            placeholder="チャットを記入"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button onClick={() => handleSendMessage()}>チャット送信</button>
        </div>
        {list.map((chat)=>(
          <div className={styles.chatArea} key={chat.message}>
            <p>{chat.message}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
