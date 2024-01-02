import React, { useState } from 'react';
import CheckIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import Button from '../ReUsableComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import { checklistDelete, checklistItemAdd, checklistItemCompletedSet, checklistItemDelete, checklistItemTextSet } from '../../../../Services/cardService';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined';
import './Checklist.css';

const Checklist = (props) => {
	const dispatch = useDispatch();
	const card = useSelector((state) => state.card);
	const [showAddItem, setShowAddItem] = useState(false);
	const [newItem, setNewItem] = useState('');
	const [hideItems, setHideItems] = useState(false);
	const percentage = () => {
		if (props.items.length === 0) return 0;
		const completed = props.items.filter((item) => item.completed);
		return Math.round(100 - ((props.items.length - completed.length) / props.items.length) * 100);
	};

	const handleChecklistDelete = async (checklistId) => {
		await checklistDelete(card.cardId, card.listId, card.boardId, checklistId, dispatch);
	};

	const handleAddChecklistItem = async (checklistId) => {
		setShowAddItem(false);
		await checklistItemAdd(card.cardId, card.listId, card.boardId, checklistId, newItem, dispatch);
		setNewItem('');
	};

	const ChecklistItem = (props) => {
		const [checked] = useState(props.completed);
		const [showEdit, setShowEdit] = useState(false);
		const [editedText, setEditedText] = useState(props.text);

		const handleChecklistItemDeleteClick = async () => {
			await checklistItemDelete(card.cardId, card.listId, card.boardId, props.checklistId, props._id, dispatch);
		};

		const handleCompletedChange = async () => {
			await checklistItemCompletedSet(
				card.cardId,
				card.listId,
				card.boardId,
				props.checklistId,
				props._id,
				!checked,
				dispatch
			);
		};

		const handleTextChange = async () => {
			await checklistItemTextSet(
				card.cardId,
				card.listId,
				card.boardId,
				props.checklistId,
				props._id,
				editedText,
				dispatch
			);
		};

		return (
			<div className="Row">
				<div className="LeftColumn">
					<Checkbox checked={checked} clickCallback={handleCompletedChange} />
				</div>
				<div className="RightColumn">
					{showEdit ? (
						<div className="TextAreaContainer">
       <textarea
		   className="TextArea"
		   value={editedText}
		   onChange={(e) => setEditedText(e.target.value)}
	   />
							<BottomButtonGroup
								title='Save'
								clickCallback={handleTextChange}
								closeCallback={() => {
									setShowEdit(false);
								}}
							/>
						</div>
					) : (
						<>
							<div
								className="CheckText"
								onClick={() => {
									setShowEdit(true);
								}}
							>
								{props.text}
							</div>
							<div className="IconWrapper" onClick={handleChecklistItemDeleteClick}>
								<DeleteIcon fontSize='1rem' />
							</div>
						</>
					)}
				</div>
			</div>
		);
	};

	return (
		<div className="Container">
			<div className="Row">
				<div className="LeftColumn">
					<CheckIcon fontSize='small' />
				</div>
				<div className="RightColumn">
					<h1 className="Title">{props.title}</h1>
					<div className="RowRightButtonsWrapper">
						<Button
							clickCallback={() => setHideItems((prev) => !prev)}
							title={hideItems ? 'Show checkeds' : 'Hide checkeds'}
						/>
						<Button clickCallback={() => handleChecklistDelete(props._id)} title='Delete' />
					</div>
				</div>
			</div>
			<div className="Row">
				<div className="LeftColumn">
					<div className="Percentage">{percentage()}%</div>
				</div>
				<div className="RightColumn">
					<Progressbar value={percentage()} />
				</div>
			</div>

			{props.items.map((item) => {
				if (hideItems && item.completed) return undefined;
				return <ChecklistItem key={item._id} checklistId={props._id} {...item} />;
			})}

			<div className="Row">
				<div className="LeftColumn"></div>
				<div className="RightColumn">
					{showAddItem ? (
						<div className="TextAreaContainer">
       <textarea
		   className="TextArea"
		   value={newItem}
		   onChange={(e) => setNewItem(e.target.value)}
		   placeholder='Add an item'
	   />
							<BottomButtonGroup
								title='Add'
								clickCallback={() => handleAddChecklistItem(props._id)}
								closeCallback={() => setShowAddItem(false)}
							/>
						</div>
					) : (
						<Button clickCallback={() => setShowAddItem(true)} title='Add an item' />
					)}
				</div>
			</div>
		</div>
	);
};

export default Checklist;
