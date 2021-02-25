import styles from '../styles/pages/Home.module.css';
import Head from 'next/head';

import { ExperienceBar } from '../componets/ExperienceBar'
import { Profile } from '../componets/Profile'
import { CompletedChallenges } from '../componets/CompletedChallenges';
import { Countdown } from '../componets/Countdown';
import { ChallengeBox } from '../componets/ChallengeBox';

export default function Home() {
  return (
    <div className={ styles.container }>
      <Head>
        <title>Iício | MoveIt</title>
      </Head>
      
      <ExperienceBar experience="57"/>
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
    </div>
  )
}