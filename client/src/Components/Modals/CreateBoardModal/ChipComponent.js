import React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";



const ChipComponent = (props) => {
    const { name, surname, email, callback } = props;
    return (
        <Tooltip
            TransitionComponent={Zoom}
            title={`${name} ${surname}`}
            size="small"
            placement="top"
            arrow
            style={{ opacity: 0.7 }}
        >
            <Chip
                onDelete={() => callback(email)}
                avatar={<Avatar>{name.toString()[0]}</Avatar>}
                label={name}
                size="small"
                color="secondary"
            />
        </Tooltip>
    );
};

export default ChipComponent;
