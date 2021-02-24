import styles from '../styles/pages/Home.module.css';
import { ExperienceBar } from '../componets/ExperienceBar'
import { Profile } from '../componets/Profile'
import { CompletedChallenges } from '../componets/CompletedChallenges';
import { Countdown } from '../componets/Countdown';

import Head from 'next/head';

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

        </div>
      </section>
    </div>
  )
}