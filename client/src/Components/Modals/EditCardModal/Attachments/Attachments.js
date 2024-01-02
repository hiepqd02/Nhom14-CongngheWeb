import React, { useState } from 'react';
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import AttachmentIcon from '@mui/icons-material/InsertLinkRounded';
import Button from '../ReUsableComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import { attachmentDelete } from '../../../../Services/cardService';
import BasePopover from '../ReUsableComponents/BasePopover';
import EditAttachmentPopover from '../Popovers/Attachment/EditAttachmentPopover';
import moment from 'moment';
import AddAttachmentPopover from '../Popovers/Attachment/AddAttachmentPopover';
import './Attachments.css';

const Attachments = (props) => {
	const card = useSelector((state) => state.card);
	const dispatch = useDispatch();
	const [editPopover, setEditPopover] = useState(null);
	const [popoverComponent, setPopoverComponent] = useState(null);
	const [attachmentPopover, setAttachmentPopover] = useState(null);

	const handleDeleteClick = async (attachmentId) => {
		await attachmentDelete(card.cardId, card.listId, card.boardId, attachmentId, dispatch);
	};
	return (
		<>
			<div className="Container">
				<AttachmentIcon fontSize='small' />
				<div className="RightWrapper">
					<h1 className="Title">Attachments</h1>
					{card.attachments.map((attachment) => {
						const validateLink = () => {};
						validateLink();
						return (
							<div className="Row" key={attachment._id} onClick={() => window.open(attachment.link, '_blank')}>
								<a className="FaviconWrapper">
									<AttachmentIcon fontSize='large' />
								</a>
								<div className="AttachmentRightWrapper">
									<div className="AttachmentTitleWrapper">
										<h3 className="AttachmentTitle">
											{attachment.name ? attachment.name : attachment.link}
										</h3>
										<div className="AttachmentTitleIconWrapper">
											<NorthEastRoundedIcon fontSize='inherit' />
										</div>
									</div>
									<div className="AttachmentFooterWrapper">
										<div className="AttachmentDate">
											{'Added ' + moment(attachment.date).format('MMM, DD [at] HH.mm')}
											<p
												className="AttachmentOperations"
												onClick={(e) => {
													e.stopPropagation();
													handleDeleteClick(attachment._id);
												}}
											>
												Delete
											</p>
											{' - '}
											<p
												className="AttachmentOperations"
												onClick={(e) => {
													e.stopPropagation();
													setPopoverComponent(attachment);
													setEditPopover(e.currentTarget);
												}}
											>
												Edit
											</p>
										</div>
									</div>
								</div>
							</div>
						);
					})}
					<Button
						style={{ width: '9rem', marginTop: '0.7rem' }}
						clickCallback={(event) => setAttachmentPopover(event.currentTarget)}
						title='Add an Attachment'
					/>
				</div>
				{editPopover && (
					<BasePopover
						anchorElement={editPopover}
						closeCallback={() => {
							setEditPopover(null);
						}}
						title='Edit'
						contents={
							<EditAttachmentPopover
								{...popoverComponent}
								closeCallback={() => {
									setEditPopover(null);
								}}
							/>
						}
					/>
				)}
				{attachmentPopover && (
					<BasePopover
						anchorElement={attachmentPopover}
						closeCallback={() => {
							setAttachmentPopover(null);
						}}
						title='Attach from...'
						contents={
							<AddAttachmentPopover
								closeCallback={() => {
									setAttachmentPopover(null);
								}}
							/>
						}
					/>
				)}
			</div>
		</>
	);
};

export default Attachments;
