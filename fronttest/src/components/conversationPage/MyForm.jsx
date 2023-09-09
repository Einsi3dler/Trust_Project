import { socket } from '../../socket';
import { useState } from 'react';

export function MyForm({ user_id, receiver_id }) {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    socket.timeout(5000).emit('send_msg', {message: value, sender_id: user_id, receiver_id: receiver_id}, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={ onSubmit }>
      <input onChange={ e => setValue(e.target.value) } className="message-input bg-dark" type="text" placeholder="Type a message..."/>

      <button type="submit"  className="btn btn-primary send-button" disabled={ isLoading }>Send</button>
    </form>
  );
}
