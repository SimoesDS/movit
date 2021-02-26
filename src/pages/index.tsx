import styles from '../styles/pages/Home.module.css';
import Head from 'next/head';

import { ExperienceBar } from '../componets/ExperienceBar'
import { Profile } from '../componets/Profile'
import { CompletedChallenges } from '../componets/CompletedChallenges';
import { Countdown } from '../componets/Countdown';
import { ChallengeBox } from '../componets/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ModalLevelUp } from '../componets/ModalLevelUp';

export default function Home() {
  return (
    <div className={ styles.container }>
      <Head>
        <title>Iício | MoveIt</title>
      </Head>

      <ExperienceBar />

      <CountdownProvider>
        <section>
          <div>
            <ModalLevelUp />
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  )
}