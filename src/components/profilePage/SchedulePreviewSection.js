import React from "react";
import { Link } from "react-router-dom";
import BasePreviewSection from "./BasePreviewSection";
import TodayTasksPreviewSection from "./TodayTasksPreviewSection";

function SchedulePreviewSection({ todayTasks }) {
    return (
        <>
            <BasePreviewSection>
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h2>Расписание</h2>
                    <Link to={"../tasks"} className="fw-bold fs-5">
                        Посмотреть детали
                    </Link>
                </div>
                <TodayTasksPreviewSection todayTasks={todayTasks} />
            </BasePreviewSection>
        </>
    );
}

export default SchedulePreviewSection;
