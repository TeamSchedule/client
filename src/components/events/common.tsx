import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface EventNameProps {
    children?: any;
}

export function EventName(props: EventNameProps) {
    return (
        <>
            <Typography variant="h6" component="div">
                {props.children}
            </Typography>
        </>
    );
}

interface EventDescriptionProps {
    children?: any;
}

export function EventDescription(props: EventDescriptionProps) {
    return (
        <>
            <Typography variant="body2" color="text.secondary">
                {props.children}
            </Typography>
        </>
    );
}

interface EventColorProps {
    color?: string;
}

export function EventColorLeft(props: EventColorProps) {
    return (
        <>
            {props.color !== undefined && (
                <Box
                    sx={{
                        borderRadius: "50%",
                        backgroundColor: props.color || "white",
                        width: "18px",
                        height: "18px",
                        mr: 1,
                        flexGrow: 0,
                    }}
                ></Box>
            )}
        </>
    );
}
