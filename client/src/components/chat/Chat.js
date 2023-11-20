import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from '../../UserContext'
import { Link, useParams } from 'react-router-dom'
import io from 'socket.io-client'
import Messages from './messages/Messages'
let socket;

function Chat() {
  const ENDPT = 'localhost:5000'

  const {user, setUser} = useContext(UserContext)
  let {room_id, room_name} = useParams();

  const [message, setMessage] = useState('')

  const [messages, sendMessages] = useState([])

  useEffect(() => {
    socket = io(ENDPT);

    // Emit the 'join' event only once when the component mounts
    socket.emit('join', { name: user.name, room_id, user_id: user.id });

    // Clean up the socket connection when the component is unmounted
    return () => {
        socket.disconnect();
    };
}, [ENDPT, user.name, room_id, user.id]); // Empty dependency array ensures this effect runs once on mount

  useEffect(()=> {
    socket.on('message', message => {
      sendMessages([...messages, message])
    })
  }, [messages])

  const sendMessage = event => {
    event.preventDefault();
    if(message) {
      console.log(message)
      socket.emit('sendMessage', message, room_id, () => 
      setMessage('')
      )
    }
  }

  return (
    <div>
      <div>{room_id} {room_name}</div>
      <h1>Chat {JSON.stringify(user)}</h1>
      <pre>{JSON.stringify(messages,null, '\t')}</pre>
      <Messages messages={messages} user_id= {user.id}/>
      <form action='' onSubmit={sendMessage}>
        <input type='text'
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyDown={event => event.key === 'Enter' ? sendMessage(event) : null}/>
        <button> Send Message</button>
      </form>
    </div>
  )
}

export default Chat