/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import calendarStore from "../../../store/CalendarStore";
import taskStore from "../../../store/TaskStore";
import { Box } from "@mui/material";
import MobileCalendar from "../calendarViews/MobileCalendar";
import DesktopCalendar from "../calendarViews/DesktopCalendar";
import { FetchingMonthRange } from "../../../api/utils/buildFilterParams";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { TaskListPath } from "../../../routes/paths";

function FullCalendar() {
    const navigate = useNavigate();
    let location = useLocation();

    const urlParams = useParams();
    const id: number = +(urlParams.id || 0);

    //
    const [isModelOpen, setIsModelOpen] = React.useState(false);
    const openModal = () => setIsModelOpen(true);
    const closeModal = () => {
        navigate(TaskListPath);
        setIsModelOpen(false);
    };

    useEffect(() => {
        if (id) {
            openModal();
            return;
        }
        setIsModelOpen(location.pathname.endsWith("new"));
    }, [id, location]);
    //

    const [currentMonth, setCurrentMonth] = useState<number>(calendarStore.getViewedDate.getMonth() + 1);
    const [currentYear, setCurrentYear] = useState<number>(calendarStore.getViewedDate.getFullYear());

    useEffect(() => {
        // Так как задачи запрашиваются в диапазоне нескольких месяцев от текущего, изменять дату, только если она вышла из диапазона

        const minViewedDate: Date = new Date(
            calendarStore.getViewedDate.getFullYear(),
            calendarStore.getViewedDate.getMonth() - FetchingMonthRange
        );
        const maxViewedDate: Date = new Date(
            calendarStore.getViewedDate.getFullYear(),
            calendarStore.getViewedDate.getMonth() + FetchingMonthRange
        );

        const newViewedDate: Date = new Date(currentYear, currentMonth);

        if (newViewedDate > maxViewedDate || newViewedDate < minViewedDate) {
            // вышли из диапазона, надо обновить дату и запросить задачи еще раз
            calendarStore.setViewedDate(new Date(currentYear, currentMonth));
        }
    }, [currentMonth, currentYear]);

    /*
     * Запросить задачи с сервера в соответствии с фильтрами в `params`
     * */
    useEffect(() => {
        taskStore.prefetchTasks();
    }, [calendarStore.filters, calendarStore.getViewedDate]);

    return (
        <>
            <Box
                sx={{
                    display: {
                        xs: "block",
                        md: "none",
                    },
                }}
            >
                <MobileCalendar
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    setCurrentMonth={setCurrentMonth}
                    setCurrentYear={setCurrentYear}
                />
            </Box>
            <Box
                sx={{
                    display: {
                        xs: "none",
                        md: "block",
                        position: "relative",
                        minWidth: "320px",
                    },
                }}
            >
                <DesktopCalendar
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    setCurrentMonth={setCurrentMonth}
                    setCurrentYear={setCurrentYear}
                />
            </Box>

            <Modal
                open={isModelOpen}
                onClose={closeModal}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    maxWidth: "100%",
                    overflowY: "auto",
                }}
            >
                <Box sx={{ background: "white", p: 2, borderRadius: 1, maxWidth: "100%" }}>
                    <Outlet />
                </Box>
            </Modal>
        </>
    );
}

export default observer(FullCalendar);
