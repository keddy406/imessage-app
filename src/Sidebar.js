import React from "react";
import "./Sidebar.css";
// components
import SidebarChat from "./SidebarChat";
import db, { auth } from "./firebase";
// redux
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
// material ui
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";

function Sidebar() {
  // get user data from redux
  const user = useSelector(selectUser);
  //short-term memory of chats data from firebase
  const [chats, setChats] = React.useState([]);
  React.useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);
  // add new chat by inputing Name
  const addChat = () => {
    const chatName = prompt("please enter a chat name");
    db.collection("chats").add({
      chatName: chatName,
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          // firebase logout function
          onClick={() => auth.signOut()}
          src={user.photo}
          className="sidebar__avatar"
        />
        <div className="sidebar__input">
          <SearchIcon />
          <input placeholder="Search..." />
        </div>
        <IconButton variant="outlined" className="sidebar__inputButton">
          <RateReviewOutlinedIcon onClick={addChat} />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
