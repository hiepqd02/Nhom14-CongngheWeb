import { Avatar } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import './ActivityLog.css';

const ActivityLog = () => {
	const card = useSelector((state) => state.card);
	return (
		<>
			{card.activities.map((activity, index) => {
				if (!activity.isComment)
					return (
						<div className="Container" key={index}>
							<div className="LeftContainer">
								<Avatar
									sx={{
										width: 28,
										height: 28,
										bgcolor: activity.color,
										fontSize: '0.875rem',
										fontWeight: '800',
									}}
								>
									{activity.userName[0].toUpperCase()}
								</Avatar>
							</div>
							<div className="RightContainer">
								<div className="LogWrapper">
									<div className="Title">{activity.userName}</div> {activity.text}
								</div>
								<div className="Date">{moment(activity.date).format('MMMM Do YYYY, h:mm:ss a')}</div>
							</div>
						</div>
					);
				return undefined;
			})}
		</>
	);
};

export default ActivityLog;
