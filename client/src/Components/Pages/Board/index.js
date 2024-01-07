import Navbar from '../../Navbar';
import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import AddList from './AddList';
import List from './List';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard } from '../../../Services/boardsService';
import { getLists } from '../../../Services/boardService';
import { updateCardOrder, updateListOrder } from '../../../Services/dragAndDropService';
import Loading from '../../Loading';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom'
import './index.scss';
import './CommonStyled.scss';
const Board = (props) => {
	/* props.match.params.id */
	const { id } = useParams();
	const dispatch = useDispatch();
	//Todo: fix the useSelector
	const { backgroundImageLink, isImage, loading, title } = useSelector((state) => state.board);
	const { allLists, loadingListService } = useSelector((state) => state.list) || {};
	const [searchString, setSearchString] = useState('');
	const boardId = id;
	useEffect(() => {
		getBoard(id, dispatch);
		getLists(boardId, dispatch);
	}, [id, dispatch, boardId]);

	useEffect(() => {
		document.title = title + ' | Boostme';
	}, [title]);

	const onDragEnd = async (result) => {
		const { draggableId, source, destination } = result;
		if (!destination) return;
		if (result.type === 'column') {
			if (source.index === destination.index) return;
			await updateListOrder(
				{
					sourceIndex: source.index,
					destinationIndex: destination.index,
					listId: draggableId,
					boardId: boardId,
					allLists: allLists,
				},
				dispatch
			);
			return;
		}
		if (source.droppableId === destination.droppableId && source.index === destination.index) return;
		await updateCardOrder(
			{
				sourceId: source.droppableId,
				destinationId: destination.droppableId,
				sourceIndex: source.index,
				destinationIndex: destination.index,
				cardId: draggableId,
				boardId: boardId,
				allLists: allLists,
			},
			dispatch
		);
	};

	return (
		<>
			<Navbar searchString={searchString} setSearchString={setSearchString} />
			<div className={`Container`} style={isImage ? { background: backgroundImageLink.split('?')[0] } : { background: backgroundImageLink }}>
				<TopBar />
				{(loading || loadingListService) && <Loading />}
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='all-columns' direction='horizontal' type='column'>
						{(provided, snapshot) => {
							return (
								<div className="ListContainer" {...provided.droppableProps} ref={provided.innerRef}>
									{!loading &&
										allLists.map((list, index) => {
											return (
												<List
													searchString={searchString}
													key={list._id}
													index={index}
													info={list}
													boardId={boardId}
												/>
											);
										})}
									{provided.placeholder}
									<AddList boardId={boardId} />
								</div>
							);
						}}
					</Droppable>
				</DragDropContext>
			</div>
		</>
	);

};

export default Board;

