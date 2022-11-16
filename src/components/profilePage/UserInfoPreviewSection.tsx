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
import { UpdateUserInfoRequestSchema } from "../../api/schemas/requests/users";
import { GetMeResponseSchema } from "../../api/schemas/responses/users";
import { AxiosError } from "axios";

export interface UserInfoPreviewSectionProps {
    login: string;
    startWorkingDt: Date;
    teamsNumber: number;
    tasksNumber: number;
    changeAvatarEditorVisibility: () => void;
}

export default function UserInfoPreviewSection(props: UserInfoPreviewSectionProps) {
    const workingTimestamp: number = props.startWorkingDt.getTime() - new Date().getTime();
    return (
        <BasePreviewSection>
            <h1 className="mb-4 fs-2">Мой профиль</h1>
            <div className="d-flex flex-column align-items-center ">
                <MainUserAvatar changeAvatarEditorVisibility={props.changeAvatarEditorVisibility} />
                <PrimaryPreviewText text={props.login} className="mt-4" />
                <div className="mb-4">
                    <UserAboutItem />
                </div>
                <div className="d-flex w-100">
                    <UserInfoPreviewItem
                        statValue={getWorkingInterval(workingTimestamp)}
                        statName="Времени с сервисом"
                    />
                    <UserInfoPreviewItem statValue={props.tasksNumber} statName="Задач" className="border-x-1" />
                    <UserInfoPreviewItem statValue={props.teamsNumber} statName="Команд" />
                </div>
            </div>
        </BasePreviewSection>
    );
}

export interface UserInfoPreviewItemProps {
    className?: string;
    statName: string;
    statValue: string | number;
}
function UserInfoPreviewItem({ className, statName, statValue }: UserInfoPreviewItemProps) {
    return (
        <>
            <div className={className + " " + "px-3 flex-grow-1"} style={{ flexBasis: 0 }}>
                <PrimaryPreviewText text={statValue.toString()} className="text-center mb-0" />
                <SecondaryPreviewText text={statName.toString()} className="text-center" />
            </div>
        </>
    );
}

interface MainUserAvatarProps {
    changeAvatarEditorVisibility: () => void;
}

function MainUserAvatar(props: MainUserAvatarProps) {
    return (
        <>
            <div className="position-relative">
                <PersonalAvatar size={200} availableForEditing={true} />
            </div>
        </>
    );
}

function UserAboutItem() {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);

    const [isEditMode, setIsEditMode] = useState(false);
    const [newAbout, setNewAbout] = useState(userInfo ? userInfo.description || "" : "Напиши о себе");

    function onEditAbout() {
        setIsEditMode(!isEditMode);
    }

    function onSaveNewAbout(event: React.KeyboardEvent) {
        if (event.code === "Enter" || event.key === "Enter") {
            const updateUserInfoData: UpdateUserInfoRequestSchema = {
                description: newAbout,
            };
            API.users
                .updateUserInfo(userInfo.id, updateUserInfoData)
                .then(() => {
                    API.users.getUser().then((userData: GetMeResponseSchema) => {
                        dispatch(set(userData.user));
                    });
                })
                .catch((err: Error | AxiosError) => {
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
