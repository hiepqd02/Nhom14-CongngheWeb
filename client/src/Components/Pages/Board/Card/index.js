import React, { useState } from 'react';
import EditCard from '../../../Modals/EditCardModal/EditCard';
import FollowIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import WatchIcon from '@mui/icons-material/AccessTimeOutlined';
import DescriptiondIcon from '@mui/icons-material/DescriptionOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CheckIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import AttachmentIcon from '@mui/icons-material/InsertLinkRounded';
import "./index.scss";
import { Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import { Avatar } from '@mui/material';
const Card = (props) => {
	const [openModal, setOpenModal] = useState(false);
	const card = props.info;
	const comment = card.activities.filter((act) => act.isComment).length;
	let checks = { c: 0, n: 0 };
	card.checklists.map((checklist) => {
		return checklist.items.map((item) => {
			if (item.completed) checks.c += 1;
			else checks.n += 1;
			return item;
		});
	});
	let labels = card.labels.filter((i) => i.selected);
	const handleOpenClose = () => {
		setOpenModal((current) => !current);
	};

	const formatDate = (date) => {
		if (moment(date).toDate().getFullYear() < new Date().getFullYear()) return moment(date).format('MMM DD, yyyy');
		else return moment(date).format('MMM DD');
	};

	function getStyle(style, snapshot) {
		if (!snapshot.isDropAnimating) {
			return style;
		}
		return {
			...style,
			transitionDuration: `80ms`,
		};
	}
	//${snapshot.isDragging ? 'dragging' : ''}
	return (
		<>
		  <div className={`draggable-container `} onClick={handleOpenClose}>
			{card.cover.isSizeOne && <div className="cover" style={{ backgroundColor: card.cover.color }}></div>}
			{labels && (
			  <div className="label-container">
				{labels.map((label) => (
				  <div key={label._id} className="label" style={{ backgroundColor: label.color }}></div>
				))}
			  </div>
			)}
	  
			<div className="card-title">{card.title}</div>
	  
			<div className="footer-container">
			  <div className="icon-group-container">
				<div className="icon-group-wrapper">
				  {card.watchers.length > 0 && <div className="icon-wrapper watcher-icon"></div>}
				  {card.attachments.length > 0 && (
					<div className="attachment-container">
					  <div className="attachment-icon"></div>
					  <span>{card.attachments.length}</span>
					</div>
				  )}
	  
				  {(card.date.dueDate || card.date.startDate) && (
					<div
					  className="date-container"
					  style={{
						backgroundColor: card.date.completed
						  ? '#61bd4f'
						  : moment(card.date.dueDate).toDate().getTime() < new Date().getTime()
						  ? '#ec9488'
						  : 'transparent',
					  }}
					>
					  <div
						className="watch-icon"
						style={{
						  color:
							card.date.completed || moment(card.date.dueDate).toDate().getTime() < new Date().getTime()
							  ? 'white'
							  : 'darkgray',
						}}
					  ></div>
					  <span
						style={{
						  color:
							card.date.completed || moment(card.date.dueDate).toDate().getTime() < new Date().getTime()
							  ? 'white'
							  : 'darkgray',
						}}
					  >{`${card.date.startDate ? formatDate(card.date.startDate) : ''}${
						card.date.startDate ? (card.date.dueDate ? ' - ' : '') : ''
					  }${card.date.dueDate ? formatDate(card.date.dueDate) : ''}${
						card.date.dueTime ? ' at ' + card.date.dueTime : ''
					  }`}</span>
					</div>
				  )}
				  {card.description && <div className="description-icon"></div>}
				  {comment > 0 && (
					<div className="comment-container">
					  <div className="comment-icon"></div>
					  <span>{comment}</span>
					</div>
				  )}
				  {card.checklists.length > 0 && (
					<div className="check-container">
					  <div className="check-icon"></div>
					  <span>{`${checks.c}/${checks.c + checks.n}`}</span>
					</div>
				  )}
				</div>
			  </div>
	  
			  {card.members && (
				<div className="members-container">
				  <div className="members-wrapper">
					{card.members &&
					  card.members.map((member, i) => (
						<div
						  key={i}
						  className="avatar"
						  style={{
							width: '28px',
							height: '28px',
							backgroundColor: member.color,
							fontSize: '0.875rem',
							fontWeight: '800',
						  }}
						>
						  {member.name[0].toUpperCase()}
						</div>
					  ))}
				  </div>
				</div>
			  )}
			</div>
		  </div>
	  
		  {openModal && (
			<div className="edit-card-modal">
			  <EditCard
				open={openModal}
				callback={handleOpenClose}
				ids={{ cardId: props.info._id, listId: props.listId, boardId: props.boardId }}
			  />
			</div>
		  )}
		</>
	  );
	  
};

export default Card;
