import React, { FC } from 'react';
import { Props } from './types';
import './index.css';

const Main: FC<Props> = (props: Props) => {
	return (
		<div className='main'>
			<div className='header'></div>
		</div>
	);
};

export default Main;
