const TaskExecutionStatus = {
    NotAssigned: "Нет исполнителя",
    InProgress: "В процессе",
    Expired: "Просрочено",
    Rejected: "Отменено",
    Done: "Выполнено",
};

export interface TaskExecutorProps {
    status: string;
}

export default function TaskStatus(props: TaskExecutorProps) {
    return (
        <>
            <div>{"Выполнено"}</div>
        </>
    );
}
