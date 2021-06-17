import React, { FC } from 'react';
import { Props } from './types';
import './index.css';
import { mock } from './mock';

const Widgets: FC<Props> = (props: Props) => {
	return <div>Widgets</div>;
};

export default Widgets;
