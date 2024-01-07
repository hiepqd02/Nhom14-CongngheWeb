import React, { useState } from 'react';
import EditCard from '../../../Modals/EditCardModal';
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

	return (
		<>
			<Draggable draggableId={props.info._id} index={props.index}>
				{(provided, snapshot) => {
					return (
						<div className='card-container'
							onClick={handleOpenClose}
							{...provided.dragHandleProps}
							{...provided.draggableProps}
							ref={provided.innerRef}
							isDragging={snapshot.isDragging}
							style={{ backgroundColor: card.cover.isSizeOne ? "#fff" : card.cover.color }}
							padding={card.cover.color && card.cover.isSizeOne}
						>
							{card.cover.isSizeOne && <div className='cover' style={{ background: card.cover.color }} />}
							{labels && (
								<div className='label-container'>
									{labels.map((label) => {
										return <div className='label' key={label._id} style={{ background: label.color }} />;
									})}
								</div>
							)}

							<div className='card-title'>{card.title}</div>
							<div className='footer-container'>
								<div className='icon-group-container'>
									<div className='icon-group-wrapper'>
										{card.watchers.length > 0 && (
											<div className='icon-wrapper'>
												<FollowIcon fontSize='0.5rem' />
											</div>
										)}
										{card.attachments.length > 0 && (
											<div className='attachment-container'>
												<AttachmentIcon fontSize='small' />
												<span>{card.attachments.length}</span>
											</div>
										)}

										{(card.date.dueDate || card.date.startDate) && ( //#ec9488, #eb5a46 #61bd4f
											<div className='date-container'
												backColor={
													card.date.completed
														? '#61bd4f'
														: moment(card.date.dueDate).toDate().getTime() <
															new Date().getTime()
															? '#ec9488'
															: 'transparent'
												}
												hoverBg={
													card.date.completed
														? '#81dd6f'
														: moment(card.date.dueDate).toDate().getTime() <
															new Date().getTime()
															? '#eb5a46'
															: 'lightgray'
												}
												color={
													card.date.completed ||
														moment(card.date.dueDate).toDate().getTime() < new Date().getTime()
														? 'white'
														: 'darkgray'
												}
											>
												<WatchIcon
													style={{
														color:
															card.date.completed ||
																moment(card.date.dueDate).toDate().getTime() <
																new Date().getTime()
																? 'white'
																: 'darkgray',
													}}
													fontSize='0.5rem'
												/>
												<span
													color={
														card.date.completed ||
															moment(card.date.dueDate).toDate().getTime() <
															new Date().getTime()
															? 'white'
															: 'darkgray'
													}
												>{`${card.date.startDate ? formatDate(card.date.startDate) : ''}${card.date.startDate ? (card.date.dueDate ? ' - ' : '') : ''
													}${card.date.dueDate ? formatDate(card.date.dueDate) : ''}${card.date.dueTime ? ' at ' + card.date.dueTime : ''
													}`}</span>
											</div>
										)}
										{card.description && <DescriptiondIcon fontSize='0.5rem' />}
										{comment > 0 && (
											<div className='comment-container'>
												<CommentIcon fontSize='0.5rem' />
												<span>{comment}</span>
											</div>
										)}
										{card.checklists.length > 0 && (
											<div className='check-container'>
												<CheckIcon fontSize='0.5rem' />
												<span>
													{checks.c}/{checks.c + checks.n}
												</span>
											</div>
										)}
									</div>
								</div>
								{card.members && (
									<div className='members-container'>
										<div className='members-wrapper'>
											{card.members &&
												card.members.map((member, i) => {
													return (
														<Avatar
															key={i}
															sx={{
																width: 28,
																height: 28,
																bgcolor: member.color,
																fontSize: '0.875rem',
																fontWeight: '800',
															}}
														>
															{member.name[0].toUpperCase()}
														</Avatar>
													);
												})}
										</div>
									</div>
								)}
							</div>
						</div>
					);
				}}
			</Draggable>
			{openModal && (
				<EditCard
					open={openModal}
					callback={handleOpenClose}
					ids={{ cardId: props.info._id, listId: props.listId, boardId: props.boardId }}
				/>
			)}
		</>
	);
};

export default Card;