type Content = { readonly id: string; readonly content: string };
export type Props = {
	readonly content: Content;
	readonly children?: any;
	readonly style?: any;
	readonly edit: boolean;
};
