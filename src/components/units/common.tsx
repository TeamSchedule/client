import { UserSchema } from "../../api/schemas/responses/users";
import UserPreview from "../users/UsersPreview/UserPreview";
import React from "react";
import Divider from "@mui/material/Divider";

interface UnitParticipantsProps {
    admin?: UserSchema;
    members: UserSchema[];
}

export function UnitParticipants(props: UnitParticipantsProps) {
    const members = props.members.map((user) => (
        <UserPreview user={user} key={user.id} clickable={true} userPost="Специалист" />
    ));

    return (
        <>
            {props.admin && (
                <>
                    <UserPreview user={props.admin} userPost="Руководитель отдела" />
                    <Divider />
                </>
            )}
            {members}
        </>
    );
}
