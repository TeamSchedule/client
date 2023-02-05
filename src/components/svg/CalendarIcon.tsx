import { IconProps } from "./IconProps";

export default function CalendarIcon(props: IconProps) {
    return (
        <>
            <svg
                viewBox="0 0 25 24"
                xmlns="http://www.w3.org/2000/svg"
                height={props.size}
                width={props.size}
                fill={props.color}
                className={props.className}
                strokeWidth={0}
            >
                <path
                    id="CalendarIcon"
                    d="M 21.125,22.458626 H 1.875 c -1.51878,0 -1.875,-0.17 -1.875,-1.4586 V 4.666666 c 0,-1.28866 0.35622,-2.33333 1.875,-2.33333 h 2.95 V 0 h 2.45 v 2.333336 h 8.45 V 0 h 2.45 v 2.333336 h 2.95 c 1.5188,0 1.875,1.04467 1.875,2.33333 v 16.33336 c 0,1.2886 -0.3562,1.4586 -1.875,1.4586 z m -19.25,-13.592 v 12.1334 h 19.25 v -12.1334 z m 0,-4.7 v 2.83337 h 19.25 v -2.83337 z m 16.5,14.5 h -2.75 v -2.3333 h 2.75 z m -5.5,0 h -2.75 v -2.3333 h 2.75 z m -5.5,0 h -2.75 v -2.3333 h 2.75 z m 11,-4.6666 h -2.75 v -2.3334 h 2.75 z m -5.5,0 h -2.75 v -2.3334 h 2.75 z m -5.5,0 h -2.75 v -2.3334 h 2.75 z"
                />
            </svg>
        </>
    );
}
