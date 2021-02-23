export interface ExperienceBarProps {
    experience: string;
}

export function ExperienceBar(props: ExperienceBarProps) {
    return (
        <header className="experience-bar">
            <span>0 xp</span>
            <div>
                <div style={{ width: `${ props.experience }%` }} />

                <span className="current-experience" style={{ left: `${ props.experience }%` }}>
                    { `${Math.round(600 * (Number(props.experience) / 100))}xp` }
                </span>
            </div>
            <span>600 xp</span>
        </header>
    );
}