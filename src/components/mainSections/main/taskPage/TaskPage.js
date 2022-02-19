import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";

import {API} from "../../../../api-server/api";
import useForceUpdate from "../../../../hooks/useForceUpdate";


export function TaskPage() {
    const forceUpdate = useForceUpdate();
    const [tasks, setTasks] = useState([]);

    function fetchTasks() {
        let fromDate = new Date("2020-01-01");
        let toDate = new Date("2023-01-01");

        // getting all tasks for current month
        let params = {
            "from": fromDate.toJSON(),
            "to": toDate.toJSON(),
        };

        API.tasks.getTasks(params).then(res => {
            setTasks(res.data.slice());
        });
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        forceUpdate();
    }, [tasks]);

    return (
        <div className="row mx-0 px-0 align-items-stretch align-content-stretch h-100">
            <div className="col">
                <Outlet context={[tasks, setTasks]} />
            </div>
        </div>
    );
}
