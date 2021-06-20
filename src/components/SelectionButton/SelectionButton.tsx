import React, { FC } from 'react';
import { Props } from './types';
import './index.css';

const SelectionButton: FC<Props> = (props: Props) => {
	const { selectedCount, lengthOfWidgets, selectAll, disselectAll } = props;
	const handleChange = () => {
		selectedCount === 0 ? selectAll() : disselectAll();
	};
	return (
		<div className='widget'>
			<label
				style={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
			>
				<input
					type={'checkbox'}
					onChange={handleChange}
					defaultChecked={true}
				/>
				{selectedCount === lengthOfWidgets
					? 'All widgets selected'
					: `${selectedCount} widgets selected`}
			</label>
		</div>
	);
};

export default SelectionButton;
