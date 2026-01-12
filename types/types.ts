export type Review = {
        gameId: string,
        authorId: string,
        authorUserName: string,
        createdAt: number,
        gameScore: number,
        review: string,
};

export type UserData = {
        id: string,
        userName: string,
        createdAt: number,
        email: string,
}