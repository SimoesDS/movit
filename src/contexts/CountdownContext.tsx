import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

let countdownTimeout: NodeJS.Timeout;

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({children}: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);
    
    const TIME_COUNTDOWN = 0.05 * 60;

    const [time, setTime] = useState(TIME_COUNTDOWN);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60); // Exemplo => 24h58 | minutes = 24
    const seconds = time % 60; //  Exemplo => 24h58 | segundos = 58

    function startCountdown() {
        setIsActive(true);
      }
      
      function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(TIME_COUNTDOWN);
        setHasFinished(false);
      }
    
      useEffect(() => {
        if(isActive && time > 0) {
          countdownTimeout = setTimeout(() => {
            setTime(time - 1);
          }, 1000);
        } else if(isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
          }
      }, [isActive, time]);

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}