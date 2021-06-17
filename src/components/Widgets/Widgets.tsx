import React, { FC, useState } from 'react';
import Widget from '../Widget';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Props, Checked } from './types';
import './index.css';
import { mock } from './mock';

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
		setList({ items });
	};

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
