import React, { useEffect, useState } from "react";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { getUserFromEmail } from "../../../Services/userService";
import ChipComponent from "./ChipComponent";

const CardTitle = (props) => {
    const dispatch = useDispatch();
    const { updateback, link } = props;
    const [memberInput, setMemberInput] = useState("");
    const [members, setMembers] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        updateback({
            title: title,
            backgroundImageLink: link,
            members: members,
        });
    }, [updateback, title, members, link]);

    const handleClick = async () => {
        const newMember = await getUserFromEmail(memberInput, dispatch);
        if (newMember == null) return;
        if (members.filter((member) => member.email === newMember.email).length > 0)
            return;

        setMembers([...members, newMember]);
    };

    const handleDelete = (email) => {
        const newMembers = members.filter((member) => member.email !== email);
        setMembers([...newMembers]);
    };

    return (
        <div className="card-title">
            <div className="panel" style={{ backgroundImage: `url(${props.link})` }}>
                <div className="panel-wrapper">
                    <div className="title-input">
                        <input
                            placeholder="Add board title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="member-wrapper">
                        <div className="member-input-wrapper">
                            <div className="member-icon">
                                <GroupAddOutlinedIcon fontSize="small" />
                            </div>
                            <div className="member-input">
                                <input placeholder="Enter email to invite"
                                    value={memberInput}
                                    type="email"
                                    onChange={(e) => setMemberInput(e.target.value)} />
                            </div>
                        </div>
                        <div className="add-btn" onClick={() => handleClick()}>
                            <AddIcon fontSize="small" />
                        </div>
                    </div>
                    <div className="close-button">
                        <CloseOutlinedIcon
                            fontSize="1rem"
                            onClick={() => props.callback()}
                        />
                    </div>
                </div>
                <div className="chip-wrapper">
                    {members.map((member) => {
                        return (
                            <ChipComponent
                                key={member.email}
                                callback={handleDelete}
                                {...member}
                            />
                        );
                    })}
                </div>
            </div>
        </div >
    );
};

export default CardTitle;
