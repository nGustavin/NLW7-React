import { useEffect, useState } from 'react'
import logoImg from '../../assets/logo.svg'
import { api } from '../../services/api'
import styles from './styles.module.scss'


type User = {
  avatar_url: string;
  name: string;
}

type MessageList = {
  id: string;
  text: string;
  user: User
}

export const MessageList: React.FC = () => {

  const [messages, setMessages] = useState<MessageList[]>([])

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