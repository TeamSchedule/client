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
import Badge from "@mui/material/Badge";
import DefaultDict from "../../../utils/defaultdict";
import Toolbar from "@mui/material/Toolbar";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";
import buildFilterParams from "../../../api/utils/buildFilterParams";
import { TaskStatusEnum } from "../../../enums/tasksEnums";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { EventStatusEnum } from "../../../enums/eventsEnums";
import { CalendarElemTypeEnum } from "../../../enums/common";
import useApiCall from "../../../hooks/useApiCall";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { API } from "../../../api/api";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import { UserSchema } from "../../../api/schemas/responses/users";
import { observer } from "mobx-react-lite";
import calendarStore from "../../../store/CalendarStore";
import { makeFullName } from "../../../utils/userUtils";

function FiltersDrawer() {
    // данные для фильтров
    const getUnitsApiCall = useApiCall<UnitResponseItemSchema[]>(() => API.units.all(), []);
    const getEventsApiCall = useApiCall<EventResponseItemSchema[]>(() => API.events.all(), []);
    const getUsersApiCall = useApiCall<UserSchema[]>(() => API.users.all(), []);
    const events: EventResponseItemSchema[] = getEventsApiCall.data;

    // открыт sidebar или нет
    const [state, setState] = React.useState<boolean>(false);

    // фильтры
    const [selectedUsersIds, setSelectedUsersIds] = useState<object>(DefaultDict()); // map(unitId: boolean)
    const [selectedUnitsIds, setSelectedUnitsIds] = useState<object>(DefaultDict());
    const [selectedEventsIds, setSelectedEventsIds] = useState<object>(DefaultDict());
    const [selectedStatus, setSelectedStatus] = useState<string>(""); // статус задач
    const [selectedType, setSelectedType] = useState<string>(CalendarElemTypeEnum.ALL); // Тип отображаемых элементов

    useEffect(() => {
        setSelectedStatus(calendarStore.filters.status || "");
        setSelectedType(calendarStore.filters.type || CalendarElemTypeEnum.ALL)
        setSelectedUsersIds(calendarStore.filters.assignee || {});
        setSelectedUnitsIds(calendarStore.filters.departments || {});
        setSelectedEventsIds(calendarStore.filters.events || {});
    }, []);

    // Количество выбранных параметров каждого типа в фильтрах
    const selectedUnits: number = Object.values(selectedUnitsIds).filter(Boolean).length;
    const selectedUsers: number = Object.values(selectedUsersIds).filter(Boolean).length;
    const selectedEvents: number = Object.values(selectedEventsIds).filter(Boolean).length;

    const isAnyFiltersActive: number =
        selectedUnits + selectedUsers + selectedEvents + +Boolean(selectedStatus) + +Boolean(selectedType);

    function filterTasks(e: React.MouseEvent) {
        const params: FilterTasksParamsSchema = buildFilterParams(calendarStore.getViewedDate);

        if (selectedUnits > 0) {
            params.departments = Object.entries(selectedUnitsIds)
                .filter((item) => item[1])
                .map((item) => +item[0]);
        }

        if (selectedEvents > 0) {
            params.events = Object.entries(selectedEventsIds)
                .filter((item) => item[1])
                .map((item) => +item[0]);
        }

        if (selectedUsers > 0) {
            params.assignee = Object.entries(selectedUsersIds)
                .filter((item) => item[1])
                .map((item) => +item[0]);
        }

        if (selectedStatus) {
            // @ts-ignore
            params.status = selectedStatus;
        }

        if (selectedType) {
            // @ts-ignore
            params.type = selectedType;
        }

        calendarStore.setFilters(params);
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

    function resetFilters(e: React.MouseEvent) {
        calendarStore.cleanFilters();

        setSelectedUnitsIds(() => DefaultDict());
        setSelectedUsersIds(() => DefaultDict());
        setSelectedEventsIds(() => DefaultDict());
        setSelectedStatus("");
        setSelectedType(CalendarElemTypeEnum.ALL);
        toggleDrawer(false)(e);
    }

    const handleChangeRadioStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedStatus((event.target as HTMLInputElement).value);
    };

    const handleChangeRadioType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedType((event.target as HTMLInputElement).value);
    };

    return (
        <>
            <Badge variant="dot" color="info" badgeContent={isAnyFiltersActive}>
                <IconButton onClick={toggleDrawer(true)} aria-label="reset" color="primary" sx={{ p: 0 }}>
                    <TuneIcon fontSize="large" sx={{ p: 0, m: 0 }} />
                </IconButton>
            </Badge>
            {state && (
                <SwipeableDrawer
                    disableBackdropTransition
                    anchor="right"
                    open={state}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <Box sx={{ minWidth: "280px", p: 2 }}>
                        <Toolbar />
                        <Divider />
                        <FormControl sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" component="span" sx={{ fontWeight: "bold" }}>
                                Тип
                            </Typography>
                            <RadioGroup
                                defaultValue={""}
                                value={selectedType}
                                onChange={handleChangeRadioType}
                                sx={{ "& .MuiRadio-root": { p: "5px" } }}
                            >
                                <FormControlLabel value={""} control={<Radio />} label="Любой" sx={{ m: 0 }} />
                                <FormControlLabel
                                    value={CalendarElemTypeEnum.TASK}
                                    control={<Radio />}
                                    label="Задачи"
                                    sx={{ m: 0 }}
                                />
                                <FormControlLabel
                                    value={CalendarElemTypeEnum.EVENT}
                                    control={<Radio />}
                                    label="События"
                                    sx={{ m: 0 }}
                                />
                            </RadioGroup>
                        </FormControl>

                        <Divider />
                        <FormControl>
                            <Typography variant="subtitle1" component="span" sx={{ fontWeight: "bold" }}>
                                Статус
                            </Typography>
                            <RadioGroup
                                defaultValue={""}
                                value={selectedStatus}
                                onChange={handleChangeRadioStatus}
                                sx={{ "& .MuiRadio-root": { p: "5px" } }}
                            >
                                <FormControlLabel value={""} control={<Radio />} label="Любой" sx={{ m: 0 }} />
                                <FormControlLabel
                                    value={TaskStatusEnum.COMPLETED}
                                    control={<Radio />}
                                    label="Завершено"
                                    sx={{ m: 0 }}
                                />
                                <FormControlLabel
                                    value={TaskStatusEnum.IN_PROGRESS}
                                    control={<Radio />}
                                    label="В работе"
                                    sx={{ m: 0 }}
                                />
                            </RadioGroup>
                        </FormControl>

                        <Divider />
                        <FilterSection title="Отделы" selectedValueCount={selectedUnits}>
                            {getUnitsApiCall.data.map((unit) => (
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
                            {events
                                .filter((event) => {
                                    return selectedStatus ? event.status === selectedStatus : true;
                                })
                                .map((event) => (
                                    <FormGroup
                                        key={event.id}
                                        sx={{ color: event.status === EventStatusEnum.COMPLETED ? "grey" : "inherit" }}
                                    >
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
                            {getUsersApiCall.data.map((user) => (
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
                                        label={makeFullName(user)}
                                    />
                                </FormGroup>
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
            )}
        </>
    );
}

export default observer(FiltersDrawer);

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
