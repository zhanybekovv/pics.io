import React, { FC, useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createBrowserHistory } from 'history';
import qs from 'qs';
import Widget from '../Widget';
import SelectionButton from '../SelectionButton';
import { Props, Checked } from './types';
import { mock } from './mock';
import './index.css';

const reorder = (list: any, startIndex: any, endIndex: any): Props[] => {
	console.log('ist', list);
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
	const [selectedCount, setSelectedCount] = useState<number>(0);
	const history = createBrowserHistory();
	const { checked, handleEdit } = props;
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

	// useEffect(() => {
	// 	const res = {} as any;
	// 	list.items.forEach(i => {
	// 		res[i.id] = i.checked;
	// 	});
	// }, []);
	const selectAll = () => {
		const res = list.items.map(i => {
			const newArr = i;
			newArr.checked = true;
			return newArr;
		});
		console.log('selectAll', res);
		setSelectedCount(res.length);
		setList({ items: res });
		// done();
	};

	const disselectAll = () => {
		const res = list.items.map(i => {
			const newArr = i;
			newArr.checked = false;
			return newArr;
		});
		console.log('disselectAll', res);
		setSelectedCount(0);
		setList({ items: res });
		// done();
	};
	useEffect(() => {
		const filterParams = history.location.search.substr(1).split(',');
		if (filterParams.length > 1) {
			const rr = {} as any;
			const filtersFromParams = filterParams.map(i => qs.parse(i));

			for (let i = 0; i < list.items.length; i++) {
				const r = Object.values(list.items[i]) as string[];
				rr[r[0]] = r[1];
			}

			const newList = [] as any;

			for (let i = 0; i < filtersFromParams.length; i++) {
				const a = Object.entries(filtersFromParams[i]);
				const res = {} as any;
				res['id'] = a[0][0];
				res['content'] = rr[a[0][0]];
				res['checked'] = a[0][1] === 'true';
				newList.push(res);
			}

			console.log('aaa', newList);
			setList({ items: newList });

			setSelectedCount(newList.filter((i: any) => i.checked).length);
		}
	}, []);

	const done = () => {
		handleEdit();
		const r = list.items.map(i => i.id + '=' + i.checked);
		history.push(`?${r}`);
	};

	const handleSelection = () => {
		console.log('fff');
	};

	return (
		<div>
			{checked && (
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
											key={name.id}
											content={name}
											setHist={setList}
											his={list}
											edit={checked}
											index={index}
											setSelectedCount={setSelectedCount}
											selectAll={selectAll}
											disselectAll={disselectAll}
										/>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			{checked && <button onClick={() => done()}> Done </button>}
		</div>
	);
};

export default Widgets;
