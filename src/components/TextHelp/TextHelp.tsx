import React from 'react';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface TextHelpProps {
    title: string
}

const TextHelp = ({ title }: TextHelpProps) => {
    return (
        <Tooltip title={
            <Typography variant="body1" sx={{ fontSize: '15px' }}>
                {title}
            </Typography>
        }>
            <HelpIcon></HelpIcon>
        </Tooltip>
    );
};

export default TextHelp