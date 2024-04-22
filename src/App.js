import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
export default function App() {
  const [friends, setFriends] = useState(initialFriends);

  const handleSetFriends = (newFriend) => {
    setFriends([...friends, newFriend]);
  };

  const [showAddFriend, setShowAddFriend] = useState(false);
  const handleShowAddFriend = () => setShowAddFriend(!showAddFriend);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onSetFriends={handleSetFriends} />}
        <Button onClick={handleShowAddFriend}>
          {!showAddFriend ? "Add Friend" : "close"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}
function Friend({ friend }) {
  let className = "";
  const whichMessage = () => {
    if (friend.balance === 0) return `Both are even`;
    else if (friend.balance < 0) {
      className = "red";
      return `You owe ${Math.abs(friend.balance)} to ${friend.name}`;
    } else {
      className = "green";
      return `${friend.name} owe ${friend.balance} to you`;
    }
  };

  const message = whichMessage();

  return (
    <li>
      <img src={friend.image} alt="Person" />
      <h3>{friend.name}</h3>
      <p className={className}>{message}</p>
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({ onSetFriends }) {
  const [name, setFriendName] = useState("");
  const [image, setImgUrl] = useState("https://i.pravatar.cc/48?=");

  const onSetFriendName = (e) => setFriendName(e.target.value);
  const onSetImg = (e) => setImgUrl(e.target.value);

  const id = crypto.randomUUID();

  const newFriend = {
    name,
    image,
    id,
    balance: 0,
  };

  return (
    <form
      className="form-add-friend"
      onSubmit={(e) => {
        e.preventDefault();
        onSetFriends(newFriend);
        setFriendName("");
        setImgUrl("https://i.pravatar.cc/48?=");
      }}
    >
      <label>👬🏻Friend Name</label>
      <input type="text" required value={name} onChange={onSetFriendName} />

      <label>👨🏻‍💻Image URL</label>
      <input type="text" required value={image} onChange={onSetImg} />

      <Button>Add</Button>
    </form>
  );
}
function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰Bill value</label>
      <input type="text" />

      <label>🙋🏻‍♂️Your Expanse</label>
      <input type="text" />

      <label>👬🏻X's Expanse</label>
      <input type="text" disabled />

      <label>🤑Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
    </form>
  );
}
