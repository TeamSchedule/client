import * as React from "react";
import { useEffect, useState } from "react";
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
import Badge from "@mui/material/Badge";
import DefaultDict from "../../../utils/defaultdict";
import { API } from "../../../api/api";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { eventsData, unitsData } from "../../../testdata/data";

interface FiltersDrawerProps {
    tasks: TaskResponseItemSchema[];
    setDisplayedTasks: (tasks: TaskResponseItemSchema[]) => void;
}

export default function FiltersDrawer(props: FiltersDrawerProps) {
    // данные для фильтров
    const [units, setUnits] = useState<UnitResponseItemSchema[]>(unitsData);
    const [events, setEvents] = useState<EventResponseItemSchema[]>(eventsData);

    // открыт sidebar или нет
    const [state, setState] = React.useState<boolean>(false);

    // фильтры
    const [selectedUsersIds, setSelectedUsersIds] = useState<object>(DefaultDict()); // map(unitId: boolean)
    const [selectedUnitsIds, setSelectedUnitsIds] = useState<object>(DefaultDict());
    const [selectedEventsIds, setSelectedEventsIds] = useState<object>(DefaultDict());
    const [showClosed, setShowClosed] = useState<boolean>(false); // показывать закрытые и выполненные

    // Количество выбранных параметров каждого типа в фильтрах
    const selectedUnits: number = Object.values(selectedUnitsIds).filter(Boolean).length;
    const selectedUsers: number = Object.values(selectedUsersIds).filter(Boolean).length;
    const selectedEvents: number = Object.values(selectedEventsIds).filter(Boolean).length;

    const isAnyFiltersActive: number = selectedUnits + selectedUsers + selectedEvents + +showClosed;

    useEffect(() => {
        // Получение данных по отделам (пользователи внутри) и событиям для формирования фильтров
        API.units
            .all()
            .then((units: UnitResponseItemSchema[]) => {
                setUnits(units);
            })
            .catch(() => {
                // TODO: ЧТо-то пошло не так
            })
            .finally(() => {});

        API.events
            .all()
            .then((events: EventResponseItemSchema[]) => {
                setEvents(events);
            })
            .catch(() => {
                // TODO: ЧТо-то пошло не так
            })
            .finally(() => {});
    }, []);

    function filterTasks(e: React.MouseEvent) {
        let filteredTasks: TaskResponseItemSchema[] = props.tasks.slice();
        if (selectedUnits > 0) {
            filteredTasks = filteredTasks.filter((task) => {
                // @ts-ignore
                return selectedUnitsIds[task.department.id];
            });
        }

        if (selectedEvents > 0) {
            filteredTasks = filteredTasks.filter((task) => {
                // @ts-ignore
                return selectedEventsIds[task.event.id];
            });
        }

        if (selectedUsers > 0) {
            filteredTasks = filteredTasks.filter((task) => {
                for (let u of task.assignee) {
                    // @ts-ignore
                    if (selectedUsersIds[u.id] === true) return true;
                }
                return false;
            });
        }

        props.setDisplayedTasks(filteredTasks);
        toggleDrawer(false)(e);
    }

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

    function resetFilters() {
        setSelectedUnitsIds(() => DefaultDict());
        setSelectedUsersIds(() => DefaultDict());
        setSelectedEventsIds(() => DefaultDict());
    }

    return (
        <>
            <Badge variant="dot" color="info" badgeContent={isAnyFiltersActive}>
                <IconButton onClick={toggleDrawer(true)} aria-label="reset" color="primary" sx={{ p: 0 }}>
                    <TuneIcon fontSize="large" sx={{ p: 0, m: 0 }} />
                </IconButton>
            </Badge>
            <SwipeableDrawer
                disableBackdropTransition
                anchor="right"
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
                    <FilterSection title="Отделы" selectedValueCount={selectedUnits}>
                        {units.map((unit) => (
                            <FormGroup key={unit.id}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            // @ts-ignore
                                            checked={selectedUnitsIds[unit.id]}
                                            onChange={() => {
                                                setSelectedUnitsIds({
                                                    ...selectedUnitsIds,
                                                    // @ts-ignore
                                                    [unit.id]: !selectedUnitsIds[unit.id],
                                                });
                                            }}
                                        />
                                    }
                                    label={unit.name}
                                />
                            </FormGroup>
                        ))}
                    </FilterSection>

                    <FilterSection title="События" selectedValueCount={selectedEvents}>
                        {events.map((event) => (
                            <FormGroup key={event.id}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            // @ts-ignore
                                            checked={selectedEventsIds[event.id]}
                                            onChange={() => {
                                                setSelectedEventsIds({
                                                    ...selectedEventsIds,
                                                    // @ts-ignore
                                                    [event.id]: !selectedEventsIds[event.id],
                                                });
                                            }}
                                        />
                                    }
                                    label={event.name}
                                />
                            </FormGroup>
                        ))}
                    </FilterSection>
                    <FilterSection title="Исполнители" selectedValueCount={selectedUsers}>
                        {units.map((unit) => (
                            <Box key={unit.id} sx={{ mb: 1 }}>
                                {unit.members.map((user) => (
                                    <FormGroup key={user.id}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    // @ts-ignore
                                                    checked={selectedUsersIds[user.id]}
                                                    onChange={() => {
                                                        setSelectedUsersIds({
                                                            ...selectedUsersIds,
                                                            // @ts-ignore
                                                            [user.id]: !selectedUsersIds[user.id],
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

                    <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={filterTasks}>
                        Применить
                    </Button>

                    <Button fullWidth variant="outlined" sx={{ mt: 3 }} onClick={resetFilters}>
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
    selectedValueCount: number;
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
                        <Badge
                            badgeContent={props.selectedValueCount}
                            color="primary"
                            sx={{
                                "& .MuiBadge-badge": {
                                    right: -15,
                                    top: 15,
                                },
                            }}
                        >
                            {props.title}
                        </Badge>
                    </Typography>
                </Box>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {props.children}
                </Collapse>
            </Box>
        </>
    );
}
