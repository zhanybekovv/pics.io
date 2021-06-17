import React, { forwardRef, useState } from 'react';
import { Props } from './types';

// eslint-disable-next-line react/display-name
const Widget = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const [checked, setChecked] = useState(true);
	const handleChange = () => {
		setChecked(!checked);
	};
	return (
		<div ref={ref} {...props}>
			<label
				style={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
			>
				<input
					type={props.edit ? 'checkbox' : 'hidden'}
					defaultChecked={checked}
					onChange={handleChange}
				/>
				{props.content.content}
			</label>
		</div>
	);
});

export default Widget;
