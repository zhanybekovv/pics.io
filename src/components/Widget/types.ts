type Content = {
	readonly id: string;
	readonly content: string;
	checked: boolean;
};
export type Props = {
	readonly content: Content;
	readonly children?: any;
	readonly style?: any;
	readonly edit: boolean;
	readonly setHist: Function;
	readonly his: any;
	readonly index: any;
	readonly setSelectedCount: Function;
	readonly selectAll: Function;
	readonly disselectAll: Function;
};
