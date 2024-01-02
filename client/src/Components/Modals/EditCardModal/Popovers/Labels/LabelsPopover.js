import React, { useState } from 'react';
import Button from '../../ReUsableComponents/Button';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/EditOutlined';
import { useDispatch, useSelector } from 'react-redux';
import './LabelsPopover.css';
import {labelUpdateSelection} from "../../../../../Services/cardService";
import {openAlert} from "../../../../../Redux/Slices/alertSlice"; // Import the CSS file

const LabelsPopover = (props) => {
	const { currentPage } = props;
	const dispatch = useDispatch();
	const thisCard = useSelector((state) => state.card);
	const [selectedCard, setSelectedCard] = useState({ _id: '', color: '', text: '', backColor: '' });
	const colors = thisCard.colors;

	const handleCreateClick = async (text, color, backColor) => {
		props.arrowCallback(false);
		props.titleCallback('Labels');
		// ... (unchanged code)
	};

	const handleSaveClick = async (labelId, text, color, backColor) => {
		props.arrowCallback(false);
		props.titleCallback('Labels');
		// ... (unchanged code)
	};

	const handleColorBoxClick = async (labelId, selected) => {
		await labelUpdateSelection(thisCard.cardId, thisCard.listId, thisCard.boardId, labelId, selected, dispatch);
	};

	const handleDeleteClick = async (labelId) => {
		props.arrowCallback(false);
		props.titleCallback('Labels');
		// ... (unchanged code)
	};

	const LabelComponent = (props) => {
		return (
			<div className="labels-row">
				<div
					className="color-box"
					style={{ backgroundColor: props.color, boxShadow: props.selected ? `-5px 0 ${props.backColor}` : 'none' }}
					onClick={() => {
						handleColorBoxClick(props._id, !props.selected);
					}}
				>
					<div className="color-text">{props.text}</div>
					{props.selected && <DoneIcon fontSize='1rem' />}
				</div>
				<div
					className="icon-wrapper"
					onClick={() => {
						setSelectedCard({
							_id: props._id,
							color: props.color,
							text: props.text,
							backColor: props.backColor,
						});
						props.arrowCallback(true);
						props.titleCallback('Change');
					}}
				>
					<EditIcon color='#091e42' fontSize='1rem' />
				</div>
			</div>
		);
	};

	const mainPage = (
		<div className="labels-container">
			<input className="search-area" placeholder='Search labels...' />
			<div className="title">Labels</div>
			{thisCard.labels.map((label) => (
				<LabelComponent key={label._id} {...label} arrowCallback={props.arrowCallback} titleCallback={props.titleCallback} />
			))}
			<br />
			<Button
				clickCallback={() => {
					props.arrowCallback(true);
					props.titleCallback('Create');
				}}
				title='Create a new label'
			/>
		</div>
	);

	const CreatePage = () => {
		const [createText, setCreateText] = useState('');
		const [createColor, setCreateColor] = useState('#0079bf');
		const [createBackColor, setCreateBackColor] = useState('#055a8c');

		return (
			<div className="labels-container">
				<div className="title">Name</div>
				<input
					className="search-area"
					placeholder='Name...'
					value={createText}
					onChange={(e) => setCreateText(e.target.value)}
				/>
				<div className="title">Select a color</div>
				<div className="small-colors-container">
					{colors.map((color) => (
						<div
							key={color.bg}
							className="small-color-box"
							style={{ backgroundColor: color.bg }}
							onClick={() => {
								setCreateColor(color.bg);
								setCreateBackColor(color.hbg);
							}}
						>
							{createColor === color.bg && <DoneIcon fontSize='1rem' />}
						</div>
					))}
				</div>
				<div className="button-container">
					<button
						className="blue-button"
						onClick={() => {
							if (createText && createColor && createBackColor) handleCreateClick(createText, createColor, createBackColor);
							else dispatch(openAlert({ severity: 'error', message: 'Please fill all required areas!' }));
						}}
					>
						Create
					</button>
				</div>
			</div>
		);
	};

	const ChangePage = () => {
		const [changeText, setChangeText] = useState(selectedCard.text);
		const [changeColor, setChangeColor] = useState(selectedCard.color);
		const [changeBackColor, setChangeBackColor] = useState(selectedCard.backColor);

		return (
			<div className="labels-container">
				<div className="title">Name</div>
				<input
					className="search-area"
					placeholder='Name...'
					value={changeText}
					onChange={(e) => setChangeText(e.target.value)}
				/>
				<div className="title">Select a color</div>
				<div className="small-colors-container">
					{colors.map((color) => (
						<div
							key={color.bg}
							className="small-color-box"
							style={{ backgroundColor: color.bg }}
							onClick={() => {
								setChangeColor(color.bg);
								setChangeBackColor(color.hbg);
							}}
						>
							{changeColor === color.bg && <DoneIcon fontSize='1rem' />}
						</div>
					))}
				</div>
				<div className="button-container">
					<button
						className="blue-button"
						onClick={() => {
							if (changeText && changeColor && changeBackColor)
								handleSaveClick(selectedCard._id, changeText, changeColor, changeBackColor);
							else dispatch(openAlert({ severity: 'error', message: 'Please fill all required areas!' }));
						}}
					>
						Save
					</button>
					<button className="red-button" onClick={() => handleDeleteClick(selectedCard._id)}>
						Delete
					</button>
				</div>
			</div>
		);
	};

	return <>{currentPage === 'Labels' ? mainPage : currentPage === 'Create' ? <CreatePage /> : <ChangePage />}</>;
};

export default LabelsPopover;
