import { Skeleton } from "@mui/material";
import { SkeletonColor } from "../../consts";

interface SkeletonWrapperProps {
    children?: string | JSX.Element | JSX.Element[];
    variant?: "text" | "rectangular" | "rounded" | "circular";
    width?: number;
    height?: number;
}

export default function SkeletonWrapper(props: SkeletonWrapperProps) {
    return (
        <>
            <Skeleton
                variant={props.variant || "text"}
                sx={{ bgcolor: SkeletonColor }}
                width={props.width}
                height={props.height}
            >
                {props.children}
            </Skeleton>
        </>
    );
}
