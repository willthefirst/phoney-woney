import styles from '../styles/Home.module.css'
import PhoneApp from './components/PhoneApp/PhoneApp'

export default function Home() {
    return (
        <div className={styles.container}>
            <PhoneApp />
        </div>
    )
}
