import * as React from "react";
import { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TuneIcon from "@mui/icons-material/Tune";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { IconButtonProps } from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";

interface FiltersDrawerProps {
    events: EventResponseItemSchema[];
    units: UnitResponseItemSchema[];
    resetFiltersHandler: () => void;

    selectedUnits: {};
    setSelectedUnits: (val: object) => void;

    selectedEventsIds: {};
    setSelectedEventsIds: (val: object) => void;

    selectedUsersIds: {};
    setSelectedUsersIds: (val: object) => void;
}

export default function FiltersDrawer(props: FiltersDrawerProps) {
    // открыт sidebar или нет
    const [state, setState] = React.useState<boolean>(true);

    const [showClosed, setShowClosed] = useState<boolean>(false); // показывать закрытые и выполненные

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }

        setState(open);
    };

    return (
        <>
            <Button onClick={toggleDrawer(true)} sx={{ py: 0 }}>
                <IconButton aria-label="reset" color="primary" sx={{ p: 0 }}>
                    <TuneIcon fontSize="large" sx={{ p: 0, m: 0 }} />
                </IconButton>
            </Button>
            <SwipeableDrawer
                disableBackdropTransition
                anchor="left"
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <Box sx={{ minWidth: "280px", p: 2 }}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={showClosed} onChange={(e) => setShowClosed(e.target.checked)} />
                            }
                            label="Показывать завершенные"
                        />
                    </FormGroup>

                    <Divider />
                    <FilterSection title="Отделы">
                        {props.units.map((unit) => (
                            <FormGroup key={unit.id}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            // @ts-ignore
                                            checked={props.selectedUnits[unit.id]}
                                            onChange={() => {
                                                props.setSelectedUnits({
                                                    ...props.selectedUnits,
                                                    // @ts-ignore
                                                    [unit.id]: !props.selectedUnits[unit.id],
                                                });
                                            }}
                                        />
                                    }
                                    label={unit.name}
                                />
                            </FormGroup>
                        ))}
                    </FilterSection>

                    <FilterSection title="События">
                        {props.events.map((event) => (
                            <FormGroup key={event.id}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            // @ts-ignore
                                            checked={props.selectedEventsIds[event.id]}
                                            onChange={() => {
                                                props.setSelectedEventsIds({
                                                    ...props.selectedEventsIds,
                                                    // @ts-ignore
                                                    [event.id]: !props.selectedEventsIds[event.id],
                                                });
                                            }}
                                        />
                                    }
                                    label={event.name}
                                />
                            </FormGroup>
                        ))}
                    </FilterSection>
                    <FilterSection title="Исполнители">
                        {props.units.map((unit) => (
                            <Box key={unit.id} sx={{ mb: 1 }}>
                                {unit.members.map((user) => (
                                    <FormGroup key={user.id}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    // @ts-ignore
                                                    checked={props.selectedUsersIds[user.id]}
                                                    onChange={() => {
                                                        props.setSelectedUsersIds({
                                                            ...props.selectedUsersIds,
                                                            // @ts-ignore
                                                            [user.id]: !props.selectedUsersIds[user.id],
                                                        });
                                                    }}
                                                />
                                            }
                                            label={user.fullName}
                                        />
                                    </FormGroup>
                                ))}
                                <Divider />
                            </Box>
                        ))}
                    </FilterSection>

                    <Button fullWidth variant="contained" sx={{ mt: 2 }}>
                        Применить
                    </Button>

                    <Button fullWidth variant="outlined" sx={{ mt: 3 }} onClick={() => props.resetFiltersHandler()}>
                        Сбросить
                    </Button>
                </Box>
            </SwipeableDrawer>
        </>
    );
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface FilterSectionProps {
    title: string;
    children?: any;
}

function FilterSection(props: FilterSectionProps) {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Box sx={{ width: "100%", py: 1 }}>
                <Box onClick={handleExpandClick} sx={{ width: "100%", "&:hover": { cursor: "pointer" } }}>
                    <ExpandMore expand={expanded} aria-expanded={expanded} aria-label="show more" sx={{ pl: 0 }}>
                        <ExpandMoreIcon />
                    </ExpandMore>
                    <Typography variant="subtitle1" component="span" sx={{ fontWeight: "bold" }}>
                        {props.title}
                    </Typography>
                </Box>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {props.children}
                </Collapse>
            </Box>
        </>
    );
}
