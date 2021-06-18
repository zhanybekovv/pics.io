import React, { FC, useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createBrowserHistory } from 'history';
import qs from 'qs';
import Widget from '../Widget';
import { Props, Checked } from './types';
import { mock } from './mock';
import './index.css';

const reorder = (list: any, startIndex: any, endIndex: any): Props[] => {
	const result = Array.from(list) as Props[];
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightgreen' : 'grey',

	// styles we need to apply on draggables
	...draggableStyle,
});

const Widgets: FC<Checked> = (props: Checked) => {
	const [list, setList] = useState({ items: mock });
	const [his, setHist] = useState({} as any);
	const history = createBrowserHistory();
	const { checked } = props;
	const onDragEnd = (result: any) => {
		if (!result.destination) {
			return;
		}

		const items = reorder(
			list.items,
			result.source.index,
			result.destination.index
		);
		const res = Object.keys(his);
		const a = res.map(i => i + '=' + his[i]);
		history.push(`?${a}`);
		setList({ items });
	};

	useEffect(() => {
		if (history.location.search.length !== 0) {
			console.log('llll');
			const res = {} as any;
			list.items.forEach(i => {
				res[i.id] = i.checked;
			});
			setHist(res);
		}
	}, []);

	useEffect(() => {
		const filterParams = history.location.search.substr(1).split(',');
		const filtersFromParams = filterParams.map(i => qs.parse(i));
		console.log('aaa', filtersFromParams);
	});

	useEffect(() => {
		if (history.location.search.length > 0) {
			console.log('lol');
			const res = Object.keys(his);
			const a = res.map(i => i + '=' + his[i]);
			history.push(`?${a}`);
		}
	});

	console.log('fgfg', his);
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='droppable'>
				{(provided, snapshot) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{list.items.map((name, index) => (
							<Draggable
								key={name.id}
								draggableId={name.id}
								index={index}
								isDragDisabled={!checked}
							>
								{(provided, snapshot) => (
									<Widget
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={getItemStyle(
											snapshot.isDragging,
											provided.draggableProps.style
										)}
										content={name}
										setHist={setHist}
										his={his}
										edit={checked}
									/>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Widgets;
