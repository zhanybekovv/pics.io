import React, { forwardRef, useState } from 'react';
import { Props } from './types';

// eslint-disable-next-line react/display-name
const Widget = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const [checked, setChecked] = useState<boolean>(props.content.checked);
	const handleChange = () => {
		setChecked(!checked);
		const res = {} as any;
		props.his[props.content.id] = !checked;
		props.setHist(props.his);
	};
	return (
		<div>
			{!props.edit ? (
				checked && (
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
				)
			) : (
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
			)}
		</div>
	);
});

export default Widget;
