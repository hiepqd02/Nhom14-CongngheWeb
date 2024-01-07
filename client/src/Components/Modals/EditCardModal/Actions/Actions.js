import React from 'react';
import './actions.css';
import Button from '../ReUsableComponents/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { cardDelete } from '../../../../Services/listService';
const Actions = () => {
	const card = useSelector((state) => state.card);
	const dispatch = useDispatch();
	return (
		<div className="Container">
			<div className="Title">Actions</div>
			<Button
				clickCallback={() => {
					cardDelete(card.listId, card.boardId, card.cardId, dispatch);
				}}
				title='Delete'
				icon={<DeleteIcon fontSize='small' />}
			></Button>
		</div>
	);
};

export default Actions;
