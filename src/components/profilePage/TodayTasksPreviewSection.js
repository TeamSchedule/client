import React from "react";
import ShortPreviewTaskItem from "../previews/ShortPreviewTaskItem";

function TodayTasksPreviewSection({ todayTasks }) {
    const today = new Date();
    return (
        <div>
            <div className="d-flex align-items-baseline mb-2">
                <h3>Сегодня</h3>
                <h4 className="px-3">
                    {today.getDate()},&nbsp;{today.toLocaleString("ru-Ru", { month: "long" })}
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
                    key={task.id}
                    taskId={task.id}
                    taskName={task.name}
                    description={task.description}
                    className="mb-2"
                    isPrivate={task.team.name == null}
                />
            ))}
        </>
    );
}
