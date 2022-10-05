import React from "react";
import {useSelector} from "react-redux";
import {selectUserInfo} from "../../../features/userInfoSlice";
import {Outlet} from "react-router-dom";
import {useNavigate} from "react-router";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from "@mui/material/Badge";
import userIcon from "../../../assets/userIcon.png";


export default function ProfilePage() {
    const userInfo = useSelector(selectUserInfo);
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);

    return (
        <>
            <div className="row w-75 m-auto">
                <div className="col-auto">
                    <button className="" style={{background: "none", border: "none"}} onClick={() => navigate('avatar')}>
                            <Avatar alt={userInfo.username} src={userIcon} sx={{width: 200, height: 200}} />
                    </button>

                    <p className="mt-4 fw-bolder fs-3">{userInfo.username}</p>

                </div>

                <div className="col">
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
                                <Tab label="Основное" onClick={() => {
                                    setValue(0);
                                    navigate('');
                                }} />
                                <Tab label={
                                    <Badge color="success">
                                        Настройки
                                    </Badge>
                                } onClick={() => {
                                    setValue(1);
                                    navigate('settings');
                                }} />
                            </Tabs>
                        </Box>

                        <TabPanel value={value} index={value}>
                            <Outlet />
                        </TabPanel>
                    </Box>
                </div>
            </div>
        </>
    );
}


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography component='div'>{children}</Typography>
                </Box>
            )}
        </div>
    );
}



