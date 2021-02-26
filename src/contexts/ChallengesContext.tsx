import { createContext, useState, ReactNode, useEffect, useContext } from 'react';

import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number,
    isActiveModalTeste: boolean,
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children}: ChallengesProviderProps){

  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  
  const [activeChallenge, setActiveChallenge] = useState(null as Challenge);

  const [isActiveModalTeste, setIsActiveModalTeste] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp(){
        setLevel(level + 1);
    }

  function completedChallenge () {
    if(!activeChallenge) return;

    const { amount } = activeChallenge
    let experienceAfterCompletedChallenge =  amount + currentExperience;
    let leveledUp = false;    
    
    if(experienceAfterCompletedChallenge >= experienceToNextLevel) {
      experienceAfterCompletedChallenge = experienceAfterCompletedChallenge - experienceToNextLevel;
      levelUp();
      leveledUp = true;
    }

    setCurrentExperience(experienceAfterCompletedChallenge);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
    setIsActiveModalTeste(leveledUp);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge as Challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉🏋️', {
        body: `Valendo ${challenge.amount}xp`,
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  useEffect(() => {
    Notification.requestPermission();
  }, []); // Array vazio para executar apenas uma vez quando o componente for exibido em tela

  return (
    <ChallengesContext.Provider value={{ 
      level, 
      currentExperience, 
      challengesCompleted, 
      activeChallenge,
      experienceToNextLevel,
      isActiveModalTeste,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completedChallenge,
      }}>
      { children }
    </ChallengesContext.Provider>
  )   
}