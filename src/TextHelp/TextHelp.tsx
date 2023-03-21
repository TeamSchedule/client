import React, { ReactElement } from 'react';
import { FC } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { SvgIconProps } from '@mui/material/SvgIcon';

interface TextHelpProps {
    title: string;
    icon: ReactElement<SvgIconProps>;
}

const TextHelp: FC<TextHelpProps> = (props) => {
    return (
        <Tooltip title={
            <Typography variant="body1" sx={{ fontSize: '15px' }}>
                {props.title}
            </Typography>}>
            {props.icon}
        </Tooltip>
    );
};

export default TextHelp;
