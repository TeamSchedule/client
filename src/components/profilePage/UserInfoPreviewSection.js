import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalAvatar from "../avatars/PersonalAvatar";
import { PrimaryPreviewText, SecondaryPreviewText } from "../previews/PreviewComponents";
import EditIcon from "../svg/EditIcon";
import BasePreviewSection from "./BasePreviewSection";
import getWorkingInterval from "../../utils/getWorkingInterval";

function UserInfoPreviewSection({
    about,
    login,
    startWorkingDt,
    teamsNumber,
    realizedTasksNumber = 8,
}) {
    return (
        <BasePreviewSection>
            <h1 className="mb-4">Мой профиль</h1>
            <div className="d-flex flex-column align-items-center ">
                <MainUserAvatar />
                <PrimaryPreviewText text={login} className="mt-4 mb-0" />
                <SecondaryPreviewText text={about} className="mb-4" />
                <div className="d-flex w-100">
                    <UserInfoPreviewItem
                        statValue={getWorkingInterval(new Date(startWorkingDt) - new Date())}
                        statName="Времени с сервисом"
                    />
                    <UserInfoPreviewItem
                        statValue={realizedTasksNumber}
                        statName="Выполнено задач"
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
    const [isHovering, setIsHovering] = useState(false);
    const editIconColor = isHovering ? "#9b9b9b" : "#d0d0d0";

    return (
        <div>
            <div
                className="position-relative"
                onMouseLeave={() => setIsHovering(false)}
                onMouseEnter={() => setIsHovering(true)}
            >
                <PersonalAvatar size={200} />
                <div
                    className="position-absolute right-0 bottom-0 cursor-pointer"
                    onClick={() => navigate("avatar")}
                >
                    <div style={{ border: `3px solid ${editIconColor}`, borderRadius: "8px" }}>
                        <EditIcon size={26} color={editIconColor} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfoPreviewSection;
