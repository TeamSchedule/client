import { styled } from "@mui/material/styles";
import { Badge, BadgeProps } from "@mui/material";

export const FilterBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -10,
        top: "50%",
    },
}));
