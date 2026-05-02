export type DocSearchProps = {
	appId: string;
	apiKey: string;
	indexName: string;
	placeholder?: string;
	searchParameters?: SearchOptions;
	disableUserPersonalization?: boolean;
	initialQuery?: string;
	insights?: boolean;
	translations?: DocSearchTranslations;
	askAi?: DocSearchAskAi | string;
};

export type SearchOptions = {
	query?: string;
	similarQuery?: string;
	facetFilters?: string | Array<string>;
	optionalFilters?: string | Array<string>;
	numericFilters?: string | Array<string>;
	tagFilters?: string | Array<string>;
	sumOrFiltersScores?: boolean;
	filters?: string;
	page?: number;
	hitsPerPage?: number;
	offset?: number;
	length?: number;
	attributesToHighlight?: Array<string>;
	attributesToSnippet?: Array<string>;
	attributesToRetrieve?: Array<string>;
	highlightPreTag?: string;
	highlightPostTag?: string;
	snippetEllipsisText?: string;
	restrictHighlightAndSnippetArrays?: boolean;
	facets?: Array<string>;
	maxValuesPerFacet?: number;
	facetingAfterDistinct?: boolean;
	minWordSizefor1Typo?: number;
	minWordSizefor2Typos?: number;
	allowTyposOnNumericTokens?: boolean;
	disableTypoToleranceOnAttributes?: Array<string>;
	queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone';
	removeWordsIfNoResults?: 'none' | 'lastWords' | 'firstWords' | 'allOptional';
	advancedSyntax?: boolean;
	advancedSyntaxFeatures?: Array<'exactPhrase' | 'excludeWords'>;
	optionalWords?: string | Array<string>;
	disableExactOnAttributes?: Array<string>;
	exactOnSingleWordQuery?: 'attribute' | 'none' | 'word';
	alternativesAsExact?: Array<'ignorePlurals' | 'singleWordSynonym' | 'multiWordsSynonym'>;
	enableRules?: boolean;
	ruleContexts?: Array<string>;
	distinct?: boolean | number;
	analytics?: boolean;
	analyticsTags?: Array<string>;
	synonyms?: boolean;
	replaceSynonymsInHighlight?: boolean;
	minProximity?: number;
	responseFields?: Array<string>;
	maxFacetHits?: number;
	percentileComputation?: boolean;
	clickAnalytics?: boolean;
	personalizationImpact?: number;
	enablePersonalization?: boolean;
	restrictSearchableAttributes?: Array<string>;
	sortFacetValuesBy?: 'count' | 'alpha';
	typoTolerance?: boolean | 'min' | 'strict';
	aroundLatLng?: string;
	aroundLatLngViaIP?: boolean;
	aroundRadius?: number | 'all';
	aroundPrecision?: number | Array<{ from: number; value: number }>;
	minimumAroundRadius?: number;
	insideBoundingBox?: Array<Array<number>>;
	insidePolygon?: Array<Array<number>>;
	ignorePlurals?: boolean | Array<string>;
	removeStopWords?: boolean | Array<string>;
	naturalLanguages?: Array<string>;
	getRankingInfo?: boolean;
	userToken?: string;
	enableABTest?: boolean;
	decompoundQuery?: boolean;
	relevancyStrictness?: number;
};

export type DocSearchTranslations = {
	button?: ButtonTranslations;
	modal?: ModalTranslations;
};

export type ButtonTranslations = {
	buttonText?: string;
	buttonAriaLabel?: string;
};

export type ModalTranslations = {
	searchBox?: SearchBoxTranslations;
	footer?: FooterTranslations;
} & ScreenStateTranslations;

export type ScreenStateTranslations = {
	errorScreen?: ErrorScreenTranslations;
	startScreen?: StartScreenTranslations;
	resultsScreen?: ResultsScreenTranslations;
	noResultsScreen?: NoResultsScreenTranslations;
	askAiScreen?: AskAiScreenTranslations;
};

export type SearchBoxTranslations = {
	clearButtonTitle?: string;
	clearButtonAriaLabel?: string;
	closeButtonText?: string;
	closeButtonAriaLabel?: string;
	placeholderText?: string;
	placeholderTextAskAi?: string;
	searchInputLabel?: string;
	placeholderTextAskAiStreaming?: string;
	backToKeywordSearchButtonText?: string;
	backToKeywordSearchButtonAriaLabel?: string;
};

export type FooterTranslations = {
	selectText?: string;
	submitQuestionText?: string;
	selectKeyAriaLabel?: string;
	navigateText?: string;
	navigateUpKeyAriaLabel?: string;
	backToSearchText?: string;
	navigateDownKeyAriaLabel?: string;
	closeText?: string;
	closeKeyAriaLabel?: string;
	poweredByText?: string;
};

export type ErrorScreenTranslations = {
	titleText?: string;
	helpText?: string;
};

export type StartScreenTranslations = {
	recentSearchesTitle?: string;
	noRecentSearchesText?: string;
	saveRecentSearchButtonTitle?: string;
	removeRecentSearchButtonTitle?: string;
	favoriteSearchesTitle?: string;
	removeFavoriteSearchButtonTitle?: string;
	recentConversationsTitle?: string;
	removeRecentConversationButtonTitle?: string;
};

export type ResultsScreenTranslations = {
	askAiPlaceholder?: string;
};

export type NoResultsScreenTranslations = {
	noResultsText?: string;
	suggestedQueryText?: string;
	reportMissingResultsText?: string;
	reportMissingResultsLinkText?: string;
};

export type AskAiScreenTranslations = {
	disclaimerText?: string;
	relatedSourcesText?: string;
	thinkingText?: string;
	copyButtonText?: string;
	copyButtonCopiedText?: string;
	copyButtonTitle?: string;
	likeButtonTitle?: string;
	dislikeButtonTitle?: string;
	thanksForFeedbackText?: string;
	preToolCallText?: string;
	duringToolCallText?: string;
	afterToolCallText?: string;
	aggregatedToolCallText?: string;
};

export type DocSearchAskAi = {
	/**
	 * The index name to use for the ask AI feature. Your assistant will search this index for relevant documents.
	 * If not provided, the index name will be used.
	 */
	indexName?: string;
	/**
	 * The API key to use for the ask AI feature. Your assistant will use this API key to search the index.
	 * If not provided, the API key will be used.
	 */
	apiKey?: string;
	/**
	 * The app ID to use for the ask AI feature. Your assistant will use this app ID to search the index.
	 * If not provided, the app ID will be used.
	 */
	appId?: string;
	/**
	 * The assistant ID to use for the ask AI feature.
	 */
	assistantId?: string;
	/**
	 * The search parameters to use for the ask AI feature.
	 */
	searchParameters?: {
		facetFilters?: SearchOptions['facetFilters'];
	};
};
