import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext);

  const TIME_COUNTDOWN = 0.05 * 60;

  const [time, setTime] = useState(TIME_COUNTDOWN);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60); // Exemplo => 24h58 | minutes = 24
  const seconds = time % 60; //  Exemplo => 24h58 | segundos = 58

  const [minuteLeft, minuteRigth] = String(minutes)
    .padStart(2, '0')
    .split('');
  const [secondLeft, secondRigth] = String(seconds)
    .padStart(2, '0')
    .split('');

  function startCountdown() {
    isActive ? setIsActive(false) : setIsActive(true)
  }
  
  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(TIME_COUNTDOWN);
  }

  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      if(isActive && time === 0) {
        setHasFinished(true);
        setIsActive(false);
        startNewChallenge();
      }
    }
  }, [isActive, time])

  return (
    <div>
      <div className={ styles.countdownContainer }>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRigth}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRigth}</span>
        </div>
      </div>
      
      {hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
            Ciclo encerrado
        </button>
      ) : (
        <>
          { isActive ? (
            <button
              type="button"
              className={ `${styles.countdownButton} ${styles.countdownButtonActive}` }
              onClick={resetCountdown}
            >
                Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={ styles.countdownButton }
              onClick={startCountdown}
            >
                Iniciar contador
            </button>
            
          )}
        </>
      )}

      
      
    </div>
  );
}