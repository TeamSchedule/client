import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PersonalAvatar } from "../avatars";
import { PrimaryPreviewText, SecondaryPreviewText } from "../previews/PreviewComponents";
import EditIcon from "../svg/EditIcon";
import BasePreviewSection from "./BasePreviewSection";
import getWorkingInterval from "../../utils/getWorkingInterval";
import { TextField } from "@mui/material";
import { API } from "../../api/api";
import { selectUserInfo, set } from "../../features/userInfoSlice";

export default function UserInfoPreviewSection({
    about,
    login,
    startWorkingDt,
    teamsNumber,
    tasksNumber,
}) {
    return (
        <BasePreviewSection>
            <h1 className="mb-4 fs-2">Мой профиль</h1>
            <div className="d-flex flex-column align-items-center ">
                <MainUserAvatar />
                <PrimaryPreviewText text={login} className="mt-4" />
                <div className="mb-4">
                    <UserAboutItem />
                </div>
                <div className="d-flex w-100">
                    <UserInfoPreviewItem
                        statValue={getWorkingInterval(new Date(startWorkingDt) - new Date())}
                        statName="Времени с сервисом"
                    />
                    <UserInfoPreviewItem
                        statValue={tasksNumber}
                        statName="Задач"
                        className="border-x-1"
                    />
                    <UserInfoPreviewItem statValue={teamsNumber} statName="Команд" />
                </div>
            </div>
        </BasePreviewSection>
    );
}

function UserInfoPreviewItem({ className, statName, statValue }) {
    return (
        <>
            <div className={className + " " + "px-3 flex-grow-1"} style={{ flexBasis: 0 }}>
                <PrimaryPreviewText text={statValue} className="text-center mb-0" />
                <SecondaryPreviewText text={statName} className="text-center" styles={{}} />
            </div>
        </>
    );
}

function MainUserAvatar({}) {
    const navigate = useNavigate();

    return (
        <div>
            <div className="position-relative">
                <PersonalAvatar size={200} />
                <div
                    className="position-absolute right-0 bottom-0"
                    onClick={() => navigate("avatar")}
                >
                    <div className="editIconBorder">
                        <EditIcon size={26} className="editIcon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function UserAboutItem({ about }) {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);

    const [isEditMode, setIsEditMode] = useState(false);
    const [newAbout, setNewAbout] = useState(
        userInfo.description.length > 0 ? userInfo.description : "Напиши о себе"
    );

    function onEditAbout() {
        setIsEditMode(!isEditMode);
    }

    function onSaveNewAbout(e) {
        if (e.code === "Enter" || e.key === "Enter") {
            API.users
                .updateUserInfo(userInfo.id, { description: newAbout })
                .then(() => {
                    API.users.get().then((res) => {
                        dispatch(set(res.data.user));
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {});
            setIsEditMode(false);
        }
    }

    return (
        <div className="d-flex">
            {isEditMode ? (
                <TextField
                    id="filled-basic"
                    variant="standard"
                    className="px-2"
                    value={newAbout}
                    onChange={(e) => setNewAbout(e.target.value)}
                    onKeyDown={onSaveNewAbout}
                />
            ) : (
                <SecondaryPreviewText text={newAbout} className="px-2" />
            )}

            <span onClick={onEditAbout}>
                <EditIcon size={26} className="editIcon" />
            </span>
        </div>
    );
}
