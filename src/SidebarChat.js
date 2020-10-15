import React from "react";
// material ui
// redux
import { useDispatch } from "react-redux";
import { setChat } from "./features/chatSlice";
// components
import { Avatar } from "@material-ui/core";
import db from "./firebase";

import "./SidebarChat.css";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();

  const [chatInfo, setChatInfo] = React.useState([]);
  // get sidbar chats data from firebase while user change
  React.useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div
      // set chatdata in redux
      onClick={() => {
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        );
      }}
      className="sidebarChat"
    >
      {/* get first of objects that reender on sidebar chart */}
      <Avatar src={chatInfo[0]?.photo} />
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.message}</p>
        <small>
          {new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleTimeString()}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
