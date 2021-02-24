import styles from '../styles/components/ExperienceBar.module.css';

export interface ExperienceBarProps {
    experience: string;
}

export function ExperienceBar(props: ExperienceBarProps) {
    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${ props.experience }%` }} />

                <span className={styles.currentExperience} style={{ left: `${ props.experience }%` }}>
                    { `${Math.round(600 * (Number(props.experience) / 100))}xp` }
                </span>
            </div>
            <span>600 xp</span>
        </header>
    );
}