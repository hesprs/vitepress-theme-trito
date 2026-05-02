export type LocalSearchTranslations = {
	button?: ButtonTranslations;
	modal?: ModalTranslations;
};

export type ButtonTranslations = {
	buttonText?: string;
	buttonAriaLabel?: string;
};

export type ModalTranslations = {
	displayDetails?: string;
	resetButtonTitle?: string;
	backButtonTitle?: string;
	noResultsText?: string;
	footer?: FooterTranslations;
};

export type FooterTranslations = {
	selectText?: string;
	selectKeyAriaLabel?: string;
	navigateText?: string;
	navigateUpKeyAriaLabel?: string;
	navigateDownKeyAriaLabel?: string;
	closeText?: string;
	closeKeyAriaLabel?: string;
};

export type PageSplitSection = {
	anchor?: string;
	titles: Array<string>;
	text: string;
};
