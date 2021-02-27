import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ModalLevelUp.module.css';

export function ModalLevelUp() {
	const { level, isActiveModalTeste, desativateModalTeste } = useContext(ChallengesContext);

	function closeModal() {
		desativateModalTeste();
	}

	return (
		<>
		{isActiveModalTeste ? (
				<div className={styles.modalLevelUpContainer} >
					<div className={styles.modal} id="modal">
						<button onClick={closeModal}>
							<img src="icons/close.svg" alt="Fechar modal"/>
						</button>
						<header>
							<span>{level}</span>
							<img src="icons/levelup.svg" alt=""/>
						</header>
						<main>
							<p>Parabéns</p>
							<p>Você alcançou um novo nível!</p>
						</main>
						<footer>
							<button>
								<span>
									Compartilhar no twitter
								</span>
								<img src="icons/twitter.svg" alt=""/>
							</button>
						</footer>
					</div>
					<div className={styles.backgroundBlur}></div>
				</div>
			) : null }
		</>
	);
}