export interface Review {
        gameId: string,
        authorId: string,
        authorUserName: string,
        createdAt: number,
        gameScore: number,
        review: string,
};

export interface IUser {
    userName: string;
    email: string;
    createdAt: number;
}
