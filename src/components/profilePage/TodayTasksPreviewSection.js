import React from "react";
import ShortPreviewTaskItem from "../previews/TaskPreview/ShortPreviewTaskItem.tsx";

function TodayTasksPreviewSection({ todayTasks }) {
    const today = new Date();
    return (
        <div>
            <div className="d-flex align-items-baseline mb-2">
                <h3>Задачи на</h3>
                <h4 className="px-2">
                    {today.getDate()}.{today.getMonth() + 1}
                </h4>
            </div>
            <TodayTaskGroup todayTasks={todayTasks} />
        </div>
    );
}

export default TodayTasksPreviewSection;

function TodayTaskGroup({ todayTasks = [] }) {
    if (todayTasks.length === 0) {
        return (
            <>
                <p className="fs-5" style={{ color: "gray" }}>
                    На сегодня задач не создано
                </p>
            </>
        );
    }

    return (
        <>
            {todayTasks.map((task) => (
                <ShortPreviewTaskItem
                    task={task}
                    key={task.id}
                    taskId={task.id}
                    taskName={task.name}
                    description={task.description}
                    isPrivate={task.team.name == null}
                />
            ))}
        </>
    );
}
