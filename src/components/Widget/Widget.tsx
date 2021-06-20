import React, { forwardRef, useState, useEffect } from 'react';
import { Props } from './types';

// eslint-disable-next-line react/display-name
const Widget = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const [checked, setChecked] = useState(props.content.checked);
	const { setSelectedCount, setHist, his, content, edit, index } = props;
	useEffect(() => {
		setChecked(props.content.checked);
	});
	const handleChange = () => {
		setChecked(prevState => !prevState);
		const res = content;
		res.checked = !checked;
		his.items[index] = res;
		setHist(his);
		!checked
			? setSelectedCount((prevState: number) => prevState + 1)
			: setSelectedCount((prevState: number) => prevState - 1);
	};
	return (
		<div>
			{edit ? (
				<div ref={ref} {...props}>
					<label
						style={{
							display: 'flex',
							justifyContent: 'flex-start',
							alignItems: 'center',
						}}
					>
						<input
							type={edit ? 'checkbox' : 'hidden'}
							defaultChecked={checked}
							onChange={handleChange}
							checked={checked}
						/>
						{content.content}
					</label>
				</div>
			) : content.checked ? (
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
						{content.content}
					</label>
				</div>
			) : null}
		</div>
	);
});

export default Widget;
