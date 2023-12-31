import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import CheckBox from '../../ReUsableComponents/Checkbox';
import Button from '../../ReUsableComponents/Button';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { openAlert } from '../../../../../Redux/Slices/alertSlice';
import { startDueDatesUpdate } from '../../../../../Services/cardService';
import './DatePopover.css'
import './DateRange.css'
const DatePopover = (props) => {
	const dispatch = useDispatch();
	const card = useSelector((state) => state.card);
	const [state, setState] = useState([
		{
			startDate:
				card.date.startDate !== null
					? moment(card.date.startDate).toDate()
					: card.date.dueDate !== null
						? moment(card.date.dueDate).toDate()
						: new Date(),
			endDate:
				card.date.dueDate !== null
					? moment(card.date.dueDate).toDate()
					: card.date.startDate !== null
						? moment(card.date.startDate).toDate()
						: new Date(),
			key: 'selection',
		},
	]);
	const [enableStartDate, setEnableStartDate] = useState(card.date.startDate != null ? card.date.startDate : false);
	const [enableDueDate, setEnableDueDate] = useState(card.date.dueDate != null ? card.date.dueDate : false);
	const [focusStart, setFocusStart] = useState(false);
	const [focusDue, setFocusDue] = useState(false);
	const [time, setTime] = useState(
		card.date.dueDate ? card.date.dueTime : moment(new Date()).format('HH:mm')
	);
	const [startDate, setStartDate] = useState(
		card.date.startDate != null ? card.date.startDate : moment(state[0].startDate).format('YYYY-MM-DD')
	);
	const [dueDate, setDueDate] = useState(
		card.date.dueDate != null ? card.date.dueDate : moment(state[0].endDate).format('YYYY-MM-DD')
	);

	useEffect(() => {
		setStartDate(moment(state[0].startDate).format('YYYY-MM-DD'));
		setDueDate(moment(state[0].endDate).format('YYYY-MM-DD'));
	}, [state]);

	const handleBlur = () => {
		const date1 = moment(startDate).toDate();
		const date2 = moment(dueDate).toDate();
		if (date1 > date2) {
			dispatch(
				openAlert({
					message: 'Due date cannot be smaller than the start date!',
					severity: 'error',
				})
			);
			setStartDate(moment(state[0].startDate).format('YYYY-MM-DD'));
			setDueDate(moment(state[0].endDate).format('YYYY-MM-DD'));
			return;
		}
		setState([
			{
				startDate: date1,
				endDate: date2,
				key: 'selection',
			},
		]);
	};

	const handleSaveClick = async () => {
		props.closeCallback();
		await startDueDatesUpdate(
			card.cardId,
			card.listId,
			card.boardId,
			enableStartDate ? startDate : null,
			enableDueDate ? dueDate : null,
			enableDueDate ? time : null,
			dispatch
		);
	};

	const handleRemoveClick = async () => {
		props.closeCallback();
		await startDueDatesUpdate(card.cardId, card.listId, card.boardId, null, null, null, dispatch);
	};

	return (
		<div className="Container">
			<div className="DateRangeWrapper">
				<DateRange
					editableDateInputs={false}
					onChange={(item) => {
						enableStartDate && enableDueDate
							? setState([item.selection])
							: state[0].startDate !== item.selection.startDate
								? setState([
									{
										startDate: item.selection.startDate,
										endDate: item.selection.startDate,
										key: 'selection',
									},
								])
								: setState([
									{
										startDate: item.selection.endDate,
										endDate: item.selection.endDate,
										key: 'selection',
									},
								]);
					}}
					format={'DD/MM/yyyy'}
					showPreview={enableStartDate && enableDueDate ? true : false}
					moveRangeOnFirstSelection={false}
					ranges={state}
				/>
			</div>
			<div className="Wrapper">
				<div className="DateTitle" focus={focusStart}>
					Start Date
				</div>
				<div className="Row">
					<CheckBox
						checked={enableStartDate}
						clickCallback={() =>
							setEnableStartDate((prev) => {
								setFocusStart(!prev);
								if (enableDueDate) setFocusDue(prev);
								if (prev) {
									setState([
										{
											startDate: moment(dueDate).toDate(),
											endDate: moment(dueDate).toDate(),
											key: 'selection',
										},
									]);
								}
								return !prev;
							})
						}
					/>
					<input
						onClick={() => {
							setFocusStart(true);
							setFocusDue(false);
						}}
						className="DateInput"
						focus={focusStart}
						readOnly={!enableStartDate}
						value={enableStartDate ? startDate : ''}
						onChange={(e) => {
							setStartDate(e.target.value);
						}}
						onBlur={handleBlur}
						onFocus={() => {
							setFocusStart(true);
							setFocusDue(false);
						}}
						type={enableStartDate ? 'date' : 'text'}
						placeholder='dd.mm.yyyy'
					/>
				</div>
				<div className="DateTitle" focus={focusDue}>
					Due Date
				</div>
				<div className="Row">
					<CheckBox
						checked={enableDueDate}
						clickCallback={() =>
							setEnableDueDate((prev) => {
								setFocusDue(!prev);
								if (enableStartDate) setFocusStart(prev);
								if (prev) {
									setState([
										{
											startDate: moment(startDate).toDate(),
											endDate: moment(startDate).toDate(),
											key: 'selection',
										},
									]);
								}
								return !prev;
							})
						}
					/>
					<input
						onClick={() => {
							setFocusStart(false);
							setFocusDue(true);
						}}
						className="DateInput"
						focus={focusDue}
						readOnly={!enableDueDate}
						value={enableDueDate ? dueDate : ''}
						onChange={(e) => {
							setDueDate(e.target.value);
						}}
						onBlur={handleBlur}
						onFocus={() => {
							setFocusStart(false);
							setFocusDue(true);
						}}
						type={enableDueDate ? 'date' : 'text'}
						placeholder='dd.mm.yyyy'
					/>
					<input
						onClick={() => {
							setFocusStart(false);
							setFocusDue(true);
						}}
						className="DateInput"
						focus={focusDue}
						onFocus={() => {
							setFocusStart(false);
							setFocusDue(true);
						}}
						readOnly={!enableDueDate}
						style={{ width: '23.5%' }}
						value={enableDueDate ? time : ''}
						onChange={(e) => setTime(e.target.value)}
						type={enableDueDate ? 'time' : 'text'}
						placeholder='hh:mm'
					/>
				</div>
				<button className="SaveButton" onClick={handleSaveClick}>
					Save
				</button>
				<Button clickCallback={handleRemoveClick} title='Remove' />
			</div>
		</div>
	);
};

export default DatePopover;
