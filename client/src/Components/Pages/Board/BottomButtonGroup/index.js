import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './index.scss';

const BottomButtonGroup = (props) => {
	const { clickCallback, closeCallback, title } = props;
	
	return (
		<div className="Row">
		  <div className="AddListButton" onClick={() => clickCallback()}>
			{title}
		  </div>
		  <div className="IconWrapper">
			<CloseIcon onClick={() => closeCallback()} fontSize="medium" />
		  </div>
		</div>
	);
};

export default BottomButtonGroup;