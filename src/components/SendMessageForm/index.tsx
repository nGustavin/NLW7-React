import { FormEvent, useState } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import useAuth from '../../hooks/useAuth'
import { api } from '../../services/api'
import styles from './styles.module.scss'


export const SendMessageForm: React.FC = () => {
  const {user, signOut} = useAuth()
  const [message, setMessage] = useState('')

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault()
    if(!message.trim()){
      return
    }

    await api.post('messages', { message })
    setMessage('')
  }

  return(
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size={32} />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImg}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size={16}/>
          {user?.login}
        </span>
      </header>

      <form className={styles.sendMessageForm} onSubmit={handleSendMessage}>
        <label htmlFor="message">Mensagem</label>
        <textarea 
          name="message" 
          id="message" 
          placeholder="Qual sua espectativa para o evento"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  )
}