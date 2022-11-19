import { ReactElement } from "react";

interface CenterLayoutWrapperProps {
    children: ReactElement;
}

export default function CenterLayoutWrapper(props: CenterLayoutWrapperProps) {
    return (
        <>
            <div className="col-12 col-xl-8 m-auto">{props.children}</div>
        </>
    );
}
