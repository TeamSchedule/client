import React, { useEffect, useState } from "react";
import { API } from "../../api/api";
import daysInMonth from "../../utils/daysinMonth";

export default function StatisticsDiagramMonthView({}) {
    const [currentDate /*setCurrentDate*/] = useState(new Date());
    const [monthTasksNumbers /*setMonthTasksNumbers*/] = useState(
        new Array(daysInMonth(currentDate.getFullYear(), currentDate.getMonth() + 1)).fill(0)
    );

    useEffect(() => {
        API.teams
            .all()
            .then((teams) => {
                API.tasks
                    .getTasks({
                        teams: teams.map((t) => t.id).join(","),
                    })
                    .then((tasks) => {
                        for (let task of tasks) {
                            if (task.closed) {
                                const dayIdx = new Date(task.expirationTime).getDate() - 1;
                                monthTasksNumbers[dayIdx] += 1;
                            }
                        }
                    })
                    .catch(() => {})
                    .finally(() => {});
            })
            .catch(() => {})
            .finally(() => {});
    }, [currentDate]);

    function onMouseWheel(event) {
        if (!event.deltaY) {
            return;
        }
        event.preventDefault();
        event.currentTarget.scrollLeft += event.deltaY + event.deltaX;
    }

    return (
        <>
            <h3 className="fs-3">
                Задачи, выполненные за {currentDate.toLocaleString("ru-Ru", { month: "long" })}
            </h3>
            <div className="d-flex position-relative">
                <div className="daysWrapper d-flex overflow-x-scroll" onWheel={onMouseWheel}>
                    {monthTasksNumbers.map((dayVal, idx) => (
                        <DayValueItem
                            key={idx}
                            value={dayVal}
                            maxValue={Math.max(...monthTasksNumbers)}
                            dayLabel={idx + 1 + "." + (currentDate.getMonth() + 1)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

function DayValueItem({ maxValue, value, dayLabel }) {
    let valueHeight = 0;
    if (maxValue !== 0) {
        valueHeight = value >= maxValue ? 100 : Math.floor((value / maxValue) * 100);
    }

    return (
        <div className="dayValueItemWrapper" style={{ width: "20px", marginRight: 15 }}>
            <p className="dayValueText text-center m-0">{value}</p>
            <div className="dayValueItemColumn">
                <div className="dayValueItem" style={{ height: `${valueHeight}%` }}></div>
            </div>
            <p className="dayLabel text-center">{dayLabel}</p>
        </div>
    );
}