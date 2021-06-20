import { WidgetsProps } from '../Widgets/types';

type Content = {
	readonly id: string;
	readonly content: string;
	checked: boolean;
};
export type Props = {
	readonly content: Content;
	readonly style?: any;
	readonly edit: boolean;
	readonly setHist: Function;
	readonly his: List;
	readonly index: any;
	readonly setSelectedCount: Function;
};

type List = {
	items: WidgetsProps[];
};
