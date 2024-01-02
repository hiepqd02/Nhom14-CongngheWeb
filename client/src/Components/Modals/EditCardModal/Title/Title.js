import React, { useEffect, useState } from 'react';
import TitleIcon from '@mui/icons-material/ChromeReaderMode';
import { titleUpdate } from '../../../../Services/cardService';
import { useDispatch, useSelector } from 'react-redux';
import './Title.css';

const Title = () => {
	const dispatch = useDispatch();
	const card = useSelector((state) => state.card);
	const [title, setTitle] = useState('');

	useEffect(() => {
		setTitle(card.title);
	}, [card.title]);

	const handleTitleAccept = async () => {
		await titleUpdate(card.cardId, card.listId, card.boardId, title, dispatch);
	};

	return (
		<div className="Container">
			<div className="IconWrapper">
				<TitleIcon fontSize='small' />
			</div>
			<div className="RightContainer">
				<input
					className="TitleInput"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onBlur={handleTitleAccept}
				></input>
				<div className="Description">
					in list <a className="Link">{card.listTitle}</a>
				</div>
			</div>
		</div>
	);
};

export default Title;
