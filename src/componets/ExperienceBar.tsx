import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export interface ExperienceBarProps {
    experience: string;
}

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

  const percentToNextLevel = Math.round(currentExperience * experienceToNextLevel) / 100;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${ currentExperience }%` }} />

        <span className={styles.currentExperience} style={{ left: `${ currentExperience }%` }}>
          { `${percentToNextLevel}xp` }
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}