const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className={message.messageType}>
        {message.text}
      </div>
    )
  }

  export default Notification