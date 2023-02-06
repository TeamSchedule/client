import styles from "./StatusBadge.module.scss";

export enum StatusBadgeEnum {
    Ok = 1,
    Error,
    Warning,
    Inactive,
}

const BadgeClassNames = {
    [StatusBadgeEnum.Ok]: styles.statusBadge__ok,
    [StatusBadgeEnum.Error]: styles.statusBadge__error,
    [StatusBadgeEnum.Warning]: styles.statusBadge__warning,
    [StatusBadgeEnum.Inactive]: styles.statusBadge__inactive,
};

interface StatusBadgeProps {
    text: string;
    status: StatusBadgeEnum;
}

export default function StatusBadge(props: StatusBadgeProps) {
    const statusClassname: string = BadgeClassNames[props.status];

    return (
        <>
            <span className={[styles.statusBadge, statusClassname].join(" ")}>{props.text}</span>
        </>
    );
}
