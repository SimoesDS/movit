import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ModalLevelUp.module.css';

export function ModalLevelUp() {
	const { level, isActiveModalTeste } = useContext(ChallengesContext);

	return (
		<div
			className={styles.modalLevelUpContainer}
		>{ 
				isActiveModalTeste ? (
					<>
						Hello Modal {level}
					</>
				) : null }
		</div>
	);
}