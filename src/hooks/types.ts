export interface User {
    picture: string;
    name: string;
}

export interface LoginForm {
    onSignIn: (username: string, password: string) => Promise<void>;
    loading: boolean;
    error: string;
}

export interface SolvedProblemWithReview {
    solvedProblemId: number;
    problemNumber: number;
    problemTitle: string;
    recentSubmitAt: string;
    recentResultText: string;
    isFavorite: boolean;
    reviewId: number;
    difficultyLevel: number;
    importanceLevel: number;
    tags: string | null;
    isReviewed: boolean;
    reviewedAt: string;
}

export interface PageResponse<T> {
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    size: number;
    content: T[];
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    pageable: {
        offset: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        paged: boolean;
        pageNumber: number;
        pageSize: number;
        unpaged: boolean;
    };
    empty: boolean;
}