import React, { forwardRef, useState, useEffect } from 'react';
import { Props } from './types';

// eslint-disable-next-line react/display-name
const Widget = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const [checked, setChecked] = useState(props.content.checked);

	useEffect(() => {
		setChecked(props.content.checked);
	});
	const handleChange = () => {
		setChecked(prevState => !prevState);
		const res = props.content;
		res.checked = !checked;
		props.his.items[props.index] = res;
		props.setHist(props.his);
		!checked
			? props.setSelectedCount((prevState: number) => prevState + 1)
			: props.setSelectedCount((prevState: number) => prevState - 1);
	};
	return (
		<div>
			{props.edit ? (
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
							checked={checked}
						/>
						{props.content.content}
					</label>
				</div>
			) : props.content.checked ? (
				<div ref={ref} {...props}>
					<label
						style={{
							display: 'flex',
							justifyContent: 'flex-start',
							alignItems: 'center',
						}}
					>
						<input
							type={'hidden'}
							defaultChecked={checked}
							onChange={handleChange}
							checked={checked}
						/>
						{props.content.content}
					</label>
				</div>
			) : null}
		</div>
	);
});

export default Widget;
