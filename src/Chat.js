import React from "react";
// components
import firebase from "firebase";
import Message from "./Message";
import db from "./firebase";
// material ui
import { IconButton } from "@material-ui/core";
import MiNoneIcon from "@material-ui/icons/MicNone";
// redux
import { useSelector } from "react-redux";
import { selectchatName, selectchatId } from "./features/chatSlice";
import { selectUser } from "./features/userSlice";
// aniamted
import FlipMove from "react-flip-move";
// css
import "./Chat.css";

function Chat() {
  // get redux data
  const user = useSelector(selectUser);
  const chatName = useSelector(selectchatName);
  const chatId = useSelector(selectchatId);
  // set shortterm memory data
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  // if chatId changed get new chatId data from firebase
  React.useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);
  // send dunction
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          To: <span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>
      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder="iMessage"
            type="text"
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>
        <IconButton>
          <MiNoneIcon className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
