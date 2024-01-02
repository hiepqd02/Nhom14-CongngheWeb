import React, { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import BottomButtonGroup from '../BottomButtonGroup/BottomButtonGroup';
import { useDispatch } from 'react-redux';
import { createList } from '../../../../../Services/boardService';
import '../../CommonStyled.scss';
import './index.scss';

const AddList = (props) => {
	const dispatch = useDispatch();
	const [addList, setAddList] = useState(false);
	const [title, setTitle] = useState('');
	const ref = useRef();

	useEffect(() => {
		if(addList)
		ref.current.focus();
	}, [addList]);

	const handleCloseClick = () => {
		setAddList(false);
		setTitle('');
	};

	const handleAddClick = () => {
		setAddList(false);
		createList(title, props.boardId, dispatch);
		setTitle('');
	};

	return (
		<>
		  <div className="AddAnotherListContainer">
			<div className="AddAnotherListButton" show={addList} onClick={() => setAddList(true)}>
			  <AddIcon />
			  <span>Add another List</span>
			</div>
			<div className="AddListContainer" show={addList}>
			  <div className="AddListWrapper">
				<input
				  className="ListTitleInput"
				  ref={ref}
				  placeholder="Enter list title"
				  value={title}
				  onChange={(e) => setTitle(e.target.value)}
				/>
				<BottomButtonGroup title="Add list" clickCallback={handleAddClick} closeCallback={handleCloseClick} />
			  </div>
			</div>
		  </div>
		</>
	  );
};

export default AddList;
