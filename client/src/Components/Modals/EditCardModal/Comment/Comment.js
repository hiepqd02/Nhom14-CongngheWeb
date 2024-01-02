import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BottomButtonGroup from '../../../Pages/BoardPage/BoardComponents/BottomButtonGroup/BottomButtonGroup.js';
import { commentDelete, commentUpdate } from '../../../../Services/cardService.js';
import { Avatar } from '@mui/material';
import './Comment.css';

const Comment = (props) => {
	const [edit, setEdit] = useState(true);
	const [comment, setComment] = useState(props.text);
	const user = useSelector((state) => state.user.userInfo);
	const card = useSelector((state) => state.card);
	const dispatch = useDispatch();
	const handleSaveClick = async () => {
		setEdit(true);
		await commentUpdate(card.cardId, card.listId, card.boardId, comment, props._id, dispatch);
	};

	const handleDeleteClick = async () => {
		await commentDelete(card.cardId, card.listId, card.boardId, props._id, dispatch);
	};
	return (
		<>
			<div className="Container">
				<div className="LeftContainer">
					<Avatar
						sx={{ width: 28, height: 28, bgcolor: props.color, fontSize: '0.875rem', fontWeight: '800' }}
					>
						{props.userName[0].toUpperCase()}
					</Avatar>
				</div>
				<div className="RightContainer">
					<div className="Title">{props.userName}</div>
					<div className="CommentWrapper">
						<textarea className={`CommentArea ${edit ? 'read-only' : ''}`} value={comment} onChange={(e) => setComment(e.target.value)} readOnly={edit} />
						<div className={`ButtonContainer ${!edit ? 'show' : ''}`}>
							<BottomButtonGroup
								title='Save'
								clickCallback={handleSaveClick}
								closeCallback={() => {
									setEdit(true);
								}}
							/>
						</div>
						<div className={`LinkContainer ${edit && user.name === props.userName ? 'show' : ''}`}>
							<div className="Link" onClick={() => setEdit(false)}>Edit</div>
							<div className="Link" onClick={handleDeleteClick}>Delete</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Comment;
