import React, { FC, useState } from 'react';
import Widgets from '../Widgets';
import { Props } from './types';
import Info from '../../public/info-icon.png';
import './index.css';

const Main: FC<Props> = (props: Props) => {
	const [show, setShow] = useState(true);
	const [edit, setEdit] = useState(false);
	const handleClick = () => {
		setShow(!show);
	};

	const handleEdit = () => {
		setEdit(!edit);
	};
	return (
		<div className='main'>
			<div className='header'>
				<div
					style={{
						backgroundColor: 'grey',
						width: '50px',
						height: '100%',
						float: 'right',
						marginRight: '20px',
						cursor: 'pointer',
					}}
					onClick={handleClick}
				>
					<img src={Info} style={{ width: '100%' }} />
				</div>
			</div>
			{show && <Widgets checked={edit} handleEdit={handleEdit} />}
			{show &&
				(!edit ? (
					<div
						style={{ color: 'yellow', cursor: 'pointer' }}
						onClick={handleEdit}
					>
						Edit Widgets
					</div>
				) : null)}
		</div>
	);
};

export default Main;
