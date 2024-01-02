import * as React from "react";
import Modal from "@mui/material/Modal";

import PhotoCardComponent from "./PhotoCardComponent";
import CardTitle from "./CardTittle";
import { useDispatch, useSelector } from "react-redux";
import { createBoard } from "../../../Services/boardsService";
// import LoadingScreen from "../../LoadingScreen";
import './index.scss'

const CreateBoard = (props) => {
    const dispatch = useDispatch();
    const creating = useSelector((state) => state.boards.creating);
    const { backgroundImages, smallPostfix } = useSelector(
        (state) => state.boards
    );

    const [open, setOpen] = React.useState(true);

    const [background, setBackground] = React.useState(
        backgroundImages[0] + smallPostfix
    );

    let newBoard = {};

    const handleClick = async () => {
        await createBoard(newBoard, dispatch);
        props.callback();
        setBackground(backgroundImages[0] + smallPostfix);
    };

    const handleSelect = (link) => {
        setBackground(link);
    };

    const handleClose = () => {
        setOpen(false);
        props.callback();
    };

    const handleUpdate = (updatedBoard) => {
        newBoard = { ...updatedBoard };
    };

    return (
        <div style={{ position: "relative" }}>
            {creating && <div>Loading</div>}
            <Modal open={open} onClose={handleClose} disableEnforceFocus>
                <div className="create-board-container">
                    <div className="wrapper">
                        <CardTitle
                            link={background}
                            updateback={handleUpdate}
                            callback={handleClose}
                        />
                        <div className="photo-card">
                            {backgroundImages.map((item, index) => {
                                return (
                                    <PhotoCardComponent
                                        key={index}
                                        selectedLink={background}
                                        link={item + smallPostfix}
                                        callback={handleSelect}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="create-button" onClick={() => handleClick()}>
                        Create Board
                    </div>
                </div>
            </Modal>
        </div>
    );
}
export default CreateBoard