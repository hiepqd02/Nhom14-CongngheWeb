import React, { useEffect, useRef, useState } from 'react';
import DescriptionIcon from '@mui/icons-material/TextSnippetOutlined';
//import BottomButtonGroup from '../../../Pages/BoardPage/BoardComponents/BottomButtonGroup/BottomButtonGroup.js';
import { useDispatch, useSelector } from 'react-redux';
import { descriptionUpdate } from '../../../../Services/cardService';
import './Description.css';
import BottomButtonGroup from '../../../Pages/Board/BottomButtonGroup';

const Description = () => {
	const thisCard = useSelector((state) => state.card);
	const dispatch = useDispatch();
	const [inputFocus, setInputFocus] = useState(false);
	const [description, setDescription] = useState(thisCard.description);
	const ref = useRef();
	const ref2 = useRef();

	const handleSaveClick = async () => {
		setInputFocus(false);
		await descriptionUpdate(thisCard.cardId, thisCard.listId, thisCard.boardId, description, dispatch);
	};

	useEffect(() => {
		setDescription(thisCard.description);
	}, [thisCard.description]);

	useEffect(() => {
		if (inputFocus) {
			ref?.current?.focus();
		}
	}, [inputFocus]);

	const handleClickOutside = (event) => {
		if (ref2.current && !ref2.current.contains(event.target)) {
			setInputFocus(false);
			setDescription(thisCard.description);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});

	return (
		<div className="Container">
			<DescriptionIcon fontSize='small' />
			<div className="RightContainer">
				<h3 className="Title">Description</h3>
				{description && !inputFocus ? (
					<p className="DescriptionText" onClick={() => setInputFocus(true)}>{description}</p>
				) : (
					<textarea
						className={`DescriptionInput ${inputFocus ? 'focus' : ''}`}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				)}
				<div style={{ display: inputFocus ? 'block' : 'none' }}>
					<BottomButtonGroup
						closeCallback={() => {
							setInputFocus(false);
							setDescription(thisCard.description);
						}}
						clickCallback={handleSaveClick}
						title='Save'
					/>
				</div>
			</div>
		</div>
	);
};

export default Description;
