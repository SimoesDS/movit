import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookie from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../componets/LevelUpModal';

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
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...restProps }: ChallengesProviderProps){
  const [level, setLevel] = useState(restProps.level);
  const [currentExperience, setCurrentExperience] = useState(restProps.currentExperience);
  const [challengesCompleted, setChallengesCompleted] = useState(restProps.challengesCompleted);
  const [isLevelUpModal, setIsLevelUpModal] = useState(false);

  const [activeChallenge, setActiveChallenge] = useState(null as Challenge);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModal(true);
    }

  function completedChallenge () {
    if(!activeChallenge) return;

    const { amount } = activeChallenge
    let experienceAfterCompletedChallenge =  amount + currentExperience;

    if(experienceAfterCompletedChallenge >= experienceToNextLevel) {
      experienceAfterCompletedChallenge = experienceAfterCompletedChallenge - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(experienceAfterCompletedChallenge);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
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

  function closeLevelUpModal() {
    setIsLevelUpModal(false);
  }

  useEffect(() => {
    Notification.requestPermission();
  }, []); // Array vazio para executar apenas uma vez quando o componente for exibido em tela

  useEffect(() => {
    Cookie.set('level', String(level));
    Cookie.set('currentExperience', String(currentExperience));
    Cookie.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted])

  return (
    <ChallengesContext.Provider value={{
      level,
      currentExperience,
      challengesCompleted,
      activeChallenge,
      experienceToNextLevel,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completedChallenge,
      closeLevelUpModal
      }}>
      { children }
      { isLevelUpModal && <LevelUpModal /> }
    </ChallengesContext.Provider>
  )
}