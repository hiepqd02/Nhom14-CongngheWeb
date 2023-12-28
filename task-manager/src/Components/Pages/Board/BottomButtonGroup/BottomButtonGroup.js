import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import * as style from './styled';

const BottomButtonGroup = (props) => {
	const { clickCallback, closeCallback, title } = props;
	/*return (
		<style.Row>
			<style.AddListButton onClick={() => clickCallback()}>{title}</style.AddListButton>
			<style.IconWrapper>
			<CloseIcon onClick={() => closeCallback()} fontSize='medium'/>
			</style.IconWrapper>
		</style.Row>
	);*/
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