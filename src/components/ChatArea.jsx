import { forwardRef } from 'react'
import Message from './Message'

const ChatArea = forwardRef(function ChatArea({ messages, hasMessages }, ref) {
  if (!hasMessages) {
    return <div className="chat chat--empty" ref={ref} />
  }

  return (
    <div className="chat" ref={ref} id="chat-area">
      {messages.map((msg, i) => (
        <Message key={msg.id || i} message={msg} />
      ))}
    </div>
  )
})

export default ChatArea
