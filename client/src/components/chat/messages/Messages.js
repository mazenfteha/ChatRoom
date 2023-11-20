import React from 'react'

function Messages({ messages, user_id}) {
    return (
        <div>
            Messages {user_id}
            {messages.map((message, i) => (
                <div key={message._id}>{message.text}</div>
            ))}
        </div>
    )
}

export default Messages