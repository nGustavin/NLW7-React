import { useEffect, useState } from 'react'
import logoImg from '../../assets/logo.svg'
import { api } from '../../services/api'
import styles from './styles.module.scss'
import io from 'socket.io-client'


type User = {
  avatar_url: string;
  name: string;
}

type MessageList = {
  id: string;
  text: string;
  user: User
}

const messagesQueue: MessageList[] = []

const socket = io('http://localhost:4000')

socket.on('new_message', newMessage => {
  messagesQueue.push(newMessage)
})

export const MessageList: React.FC = () => {

  const [messages, setMessages] = useState<MessageList[]>([])

  useEffect(() => {
    setInterval(() => {
      if(messagesQueue.length > 0){
        setMessages(prev => [
          messagesQueue[0],
          prev[0],
          prev[1]
        ].filter(Boolean))

        messagesQueue.shift()
      }
    }, 3000)
  }, [messagesQueue])

  useEffect(() => {
    api.get<MessageList[]>('messages/last3').then(response => setMessages(response.data))
  }, [])

  return(
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map(({id, text, user}) => (
          <li className={styles.message} key={id}>
            <p className={styles.messageContent}>{text}</p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={user.avatar_url} alt={user.name} />
              </div>
              <span>{user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}