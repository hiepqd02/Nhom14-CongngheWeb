import React, { useEffect, useRef, useState } from 'react';
import MessageIcon from '@mui/icons-material/MessageOutlined';
import Comment from '../Comment/Comment';
import ActivityLog from '../ActivityLog/ActivityLog';
import Button from '../ReUsableComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import { comment } from '../../../../Services/cardService';
import { Avatar } from '@mui/material';
import './Activity.css';

const Activity = () => {
	const dispatch = useDispatch();
	const ref = useRef();
	const card = useSelector((state) => state.card);
	const user = useSelector((state) => state.user);
	const [focusComment, setFocusComment] = useState(false);
	const [newComment, setNewComment] = useState('');
	const [details, setDetails] = useState(false);

	const handleSaveClick = async () => {
		await comment(card.cardId, card.listId, card.boardId, newComment, user.name, dispatch);
		setNewComment('');
	};

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setFocusComment(false);
		} else {
			setFocusComment(true);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});

	return (
		<>
			<div className="activity-container">
				<div className="LeftContainer">
					<MessageIcon fontSize='small' />
					<Avatar
						sx={{
							width: 28,
							height: 28,
							bgcolor: user.userInfo.color,
							fontSize: '0.875rem',
							fontWeight: '800',
						}}
					>
						{user.userInfo.name[0].toUpperCase()}
					</Avatar>
				</div>
				<div className="RightContainer">
					<div className="TitleWrapper">
						<div className="Title">Activity</div>
						<Button
							clickCallback={() => setDetails((prev) => !prev)}
							title={details ? 'Hide details' : 'Show details'}
						/>
					</div>
					<div className="CommentWrapper" ref={ref}>
						<button className={`SaveButton ${newComment && focusComment ? 'show' : ''}`} onClick={handleSaveClick}>
							Save
						</button>
						<textarea
							className="CommentArea"
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							onFocus={() => setFocusComment(true)}
							onBlur={() => setFocusComment(false)}
							placeholder='Write a comment...'
						/>
					</div>
				</div>
			</div>
			{
				card.activities.map((activity) => {
					if (activity.isComment) {
						return <Comment key={activity._id} {...activity} />;
					}
					return undefined;
				})
			}

			{details && <ActivityLog />}
		</>
	);
};

export default Activity;
