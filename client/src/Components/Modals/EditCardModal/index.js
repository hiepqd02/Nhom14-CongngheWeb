import * as React from 'react';
import './editcard.css';
import Modal from '@mui/material/Modal';
import Actions from './Actions/Actions';
import Activity from './Activity/Activity';
import AddToCard from './AddToCard/AddToCard';
import Checklist from './Checklist/Checklist';
import Description from './Description/Description';
import Attachments from './Attachments/Attachments';
import Features from './Features/Features';
import Title from './Title/Title';
import CardLoadingSvg from '../../../assets/Images/cardLoading.svg';
import { getCard } from '../../../Services/cardService';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from './ReUsableComponents/IconButton';
import CoverIcon from '@mui/icons-material/TableChartOutlined';
import CloseIcon from '@mui/icons-material/Close';

export default function EditCard(props) {
	const { cardId, listId, boardId } = props.ids;
	const dispatch = useDispatch();
	const thisCard = useSelector((state) => state.card);
	React.useEffect(() => {
		if (props.open) {
			getCard(cardId, listId, boardId, dispatch);
		}
	}, [boardId, cardId, dispatch, listId, props.open]);

	return (
		<div style={{ position: 'relative' }}>
			<Modal open={props.open} onClose={props.callback} style={{ overflow: 'auto' }}>
				<div className="edit-card-container">
					{/* <div className="CoverContainer" style={{ backgroundColor: !thisCard.pending ? thisCard.cover.color : null }}>
						<div className="CoverButtonWrapper">
							<IconButton title='Cover' icon={<CoverIcon fontSize='small' />} />
						</div>
					</div> */}
					<div className="TitleContainer">{!thisCard.pending && <Title />}</div>
					<div className="edit-card-wrapper">
						<div className="MainContainer">
							{!thisCard.pending ? (
								<>
									{(thisCard.members.length > 0 ||
										thisCard.labels.filter((label) => label.selected).length > 0 ||
										thisCard.date.startDate ||
										thisCard.date.dueDate) && (
											<div className="FeaturesContainer">
												<Features />
											</div>
										)}
									<div className="DescriptionContainer">
										<Description />
									</div>
									{thisCard.attachments.length > 0 && (
										<div className="AttachmentContainer">
											<Attachments />
										</div>
									)}
									{thisCard.checklists.length > 0 && (
										<div className="ChecklistContainer">
											{thisCard.checklists.map((list) => {
												return <Checklist key={list._id} {...list} />;
											})}
										</div>
									)}
									<div className="ActivityContainer">
										<Activity />
									</div>
								</>
							) : (
								<div className="LoadingScreen" style={{ backgroundImage: `url(${CardLoadingSvg})` }} />
							)}
						</div>
						<div className="RightContainer">
							<div className="AddToCardContainer">
								<AddToCard />
							</div>
							<div className="ActionsContainer">
								<Actions />
							</div>
						</div>
					</div>
					<div className="CloseIconWrapper" onClick={props.callback}>
						<CloseIcon fontSize='small' color='black' />
					</div>
				</div>
			</Modal>
		</div>
	);
}
