import Markdown from 'react-markdown'

function Message({ message }) {
  const isUser = message.role === 'user'
  const isStreaming = message.streaming

  return (
    <div className={`message message--${isUser ? 'user' : 'ai'}`}>
      <div className="message__body">
        {isUser ? (
          message.content
        ) : (
          <Markdown>{message.content}</Markdown>
        )}
        {isStreaming && message.content.length > 0 && (
          <span className="message__cursor" />
        )}
        {isStreaming && message.content.length === 0 && (
          <div className="typing">
            <span className="typing__dot" />
            <span className="typing__dot" />
            <span className="typing__dot" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Message
