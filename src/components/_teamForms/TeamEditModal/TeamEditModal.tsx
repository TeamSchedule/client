import React, { useEffect, useState } from "react";
import CloseFormIcon from "../../generic/CloseFormIcon";
import TeamAvatar from "../../avatars/TeamAvatar";
import { useTeamData } from "../TeamMembersModal/TeamMembersModal";
import modalStyles from "../TeamMembersModal/TeamMembersModal.module.scss";
import styles from "./TeamEditModal.module.scss";
import InputColorFormItem from "../../inputs/InputColorFormItem";
import { UpdateTeamRequestSchema } from "../../../api/schemas/requests/units";
import { API } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { BaseButton } from "../../buttons";
import TextInputInPlace from "../../inputs/TextInputInPlace";

export default function TeamEditModal() {
    const navigate = useNavigate();

    const { team } = useTeamData();

    const [color, setColor] = useState<string>(team?.color || "#ffffff");
    const [teamName, setTeamName] = useState("");

    // circular loaders
    const [isUpdateActionInProgress, setIsUpdateActionInProgress] = useState(false);
    const [isLeaveActionInProgress, setIsLeaveActionInProgress] = useState(false);

    useEffect(() => {
        setTeamName(team?.name || "");
    }, []);

    function onEditTeam(event: React.FormEvent) {
        event.preventDefault();
        setIsUpdateActionInProgress(true);
        if (!team?.id) return;

        const updateTeamData: UpdateTeamRequestSchema = {
            newName: teamName,
            color: color,
        };
        API.units
            .update(+team?.id, updateTeamData)
            .then(() => {
                navigate("..");
            })
            .finally(() => {
                setIsUpdateActionInProgress(false);
                navigate(0);
            });
    }

    function onLeaveTeam() {
        setIsLeaveActionInProgress(true);
        if (!team?.id) return;
        API.units
            .leave(+team?.id)
            .then(() => {
                navigate("..");
            })
            .finally(() => {
                setIsLeaveActionInProgress(false);
            });
    }

    return (
        <>
            <div className={modalStyles.teamModal}>
                <div className={modalStyles.closeIconWrapper}>
                    <CloseFormIcon />
                </div>
                <div className={styles.fieldsWrapper}>
                    <TeamAvatar
                        imgSrc={team?.avatar || ""}
                        size={100}
                        teamColor={team?.color}
                        availableForEditing
                        teamId={team?.id.toString()}
                    />
                    <div className="ml-4">
                        {/*<InputTextFormItem label="Название команды" value={team?.name || ""} handleChange={() => {}} />*/}
                        <TextInputInPlace value={teamName} handleChange={setTeamName} />

                        <div className="d-flex">
                            <p className="mr-3">Цвет задач</p>
                            <InputColorFormItem setColor={setColor} color={color} />
                        </div>
                    </div>
                </div>

                <BaseButton
                    text="Сохранить изменения"
                    loading={isUpdateActionInProgress}
                    color="success"
                    onClick={onEditTeam}
                    className="d-block mt-2 m-auto"
                />
                <BaseButton
                    text="Покинуть команду"
                    onClick={onLeaveTeam}
                    loading={isLeaveActionInProgress}
                    color="danger"
                    className="d-block mt-2 m-auto"
                />
            </div>
        </>
    );
}
