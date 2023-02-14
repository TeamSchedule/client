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
