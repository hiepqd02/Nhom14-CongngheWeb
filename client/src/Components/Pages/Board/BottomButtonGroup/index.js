import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './index.scss';

const BottomButtonGroup = (props) => {
	const { clickCallback, closeCallback, title } = props;
	
	return (
		<div className="row">
		  <div className="add-list-button" onClick={() => clickCallback()}>
			{title}
		  </div>
		  <div className="icon-wrapper">
			<CloseIcon onClick={() => closeCallback()} fontSize="medium" />
		  </div>
		</div>
	);
};

export default BottomButtonGroup;