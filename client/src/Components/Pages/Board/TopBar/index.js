import React, { useEffect, useState } from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import '../CommonStyled.scss';
import { useDispatch, useSelector } from 'react-redux';
import { boardTitleUpdate } from '../../../../Services/boardsService';
import RightDrawer from '../../../Drawers/RightDrawer/RightDrawer';
import BasePopover from '../../../Modals/EditCardModal/ReUsableComponents/BasePopover';
import InviteMembers from '../../../Modals/EditCardModal/Popovers/InviteMembers/InviteMembers';
import './index.scss';

const TopBar = () => {
	const board = useSelector((state) => state.board);
	const [currentTitle, setCurrentTitle] = useState(board.title);
	const [showDrawer, setShowDrawer] = useState(false);
	const [invitePopover, setInvitePopover] = React.useState(null);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!board.loading)
			setCurrentTitle(board.title);
	}, [board.loading, board.title]);
	const handleTitleChange = () => {
		boardTitleUpdate(currentTitle, board.id, dispatch);
	};
	return (
		<div className="top-bar">
			<div className="left-wrapper">
				<div className="invite-button" onClick={(event) => setInvitePopover(event.currentTarget)}>
					<PersonAddAltIcon />
					<span className="text-span">Add Member</span>
				</div>
				{invitePopover && (
					<div className="base-popover">
						<BasePopover
							anchorElement={invitePopover}
							closeCallback={() => {
								setInvitePopover(null);
							}}
							title="Invite Members"
							contents={<InviteMembers closeCallback={() => setInvitePopover(null)} />}
						/>
					</div>
				)}

				<input
					className="board-name-input"
					placeholder="Board Name"
					value={currentTitle}
					onChange={(e) => setCurrentTitle(e.target.value)}
					onBlur={handleTitleChange}
				/>
			</div>

			<div className="right-wrapper">
				<button className="button" onClick={() => setShowDrawer(true)}>
					<MoreHorizIcon />
					<span className="text-span">Show menu</span>
				</button>
			</div>
			<RightDrawer show={showDrawer} closeCallback={() => setShowDrawer(false)} />
		</div>
	);

};

export default TopBar;
