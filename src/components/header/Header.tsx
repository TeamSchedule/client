import React from "react";
import AuthorizedHeader from "./AuthorizedHeader";
import { User } from "../../schemas/instances/users";

interface HeaderProps {
    user: User;
}

export default function Header(props: HeaderProps) {
    return <AuthorizedHeader user={props.user} />;
}
