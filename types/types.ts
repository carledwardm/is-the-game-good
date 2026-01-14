export type Review = {
        title: string;
        gameId: string,
        authorId: string,
        authorUserName: string,
        createdAt: number,
        gameScore: number,
        review: string,
        commentCount: number;
        helpfulScore: number;
};

export type UserData = {
        id: string,
        userName: string,
        createdAt: number,
        email: string,
}