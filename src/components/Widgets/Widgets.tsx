import React, { FC, useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createBrowserHistory } from 'history';
import qs from 'qs';
import Widget from '../Widget';
import SelectionButton from '../SelectionButton';
import { WidgetsProps, Checked } from './types';
import { mock } from './mock';
import './index.css';

const reorder = (
	list: WidgetsProps[],
	startIndex: number,
	endIndex: number
): WidgetsProps[] => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
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
	const [selectedCount, setSelectedCount] = useState<number>(0);
	const history = createBrowserHistory();
	const { edit, handleEdit } = props;
	const onDragEnd = (result: any) => {
		if (!result.destination) {
			return;
		}

		const items = reorder(
			list.items,
			result.source.index,
			result.destination.index
		);

		const r = items.map(i => i.id + '=' + i.checked);
		history.push(`?${r}`);
		setList({ items });
	};

	const selectAll = () => {
		const res = list.items.map(i => {
			const newArr = i;
			newArr.checked = true;
			return newArr;
		});
		setSelectedCount(res.length);
		setList({ items: res });
	};

	const disselectAll = () => {
		const res = list.items.map(i => {
			const newArr = i;
			newArr.checked = false;
			return newArr;
		});
		setSelectedCount(0);
		setList({ items: res });
	};
	useEffect(() => {
		const filterParams = history.location.search.substr(1).split(',');
		if (filterParams.length > 1) {
			const rr: any = {};
			const filtersFromParams = filterParams.map(i => qs.parse(i));

			for (let i = 0; i < list.items.length; i++) {
				const r = Object.values(list.items[i]) as string[];
				rr[r[0]] = r[1];
			}

			const newList = [];

			for (let i = 0; i < filtersFromParams.length; i++) {
				const a = Object.entries(filtersFromParams[i]);
				const res: WidgetsProps = { id: '', content: '', checked: true };
				res['id'] = a[0][0];
				res['content'] = rr[a[0][0]];
				res['checked'] = a[0][1] === 'true';
				newList.push(res);
			}

			setList({ items: newList });

			setSelectedCount(newList.filter(i => i.checked).length);
		}
	}, []);

	const done = () => {
		handleEdit();
		const r = list.items.map(i => i.id + '=' + i.checked);
		history.push(`?${r}`);
	};

	return (
		<div>
			{edit && (
				<SelectionButton
					selectedCount={selectedCount}
					lengthOfWidgets={list.items.length}
					selectAll={selectAll}
					disselectAll={disselectAll}
				/>
			)}
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='droppable'>
					{(provided, snapshot) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{list.items.map((item, index) => (
								<Draggable
									key={item.id}
									draggableId={item.id}
									index={index}
									isDragDisabled={!edit}
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
											key={item.id}
											content={item}
											setHist={setList}
											his={list}
											edit={edit}
											index={index}
											setSelectedCount={setSelectedCount}
										/>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			{edit && <button onClick={() => done()}> Done </button>}
		</div>
	);
};

export default Widgets;
