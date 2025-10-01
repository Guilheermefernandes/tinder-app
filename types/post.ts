export type Post = {
    id: string,
    userId: string,
    path: string,
    title: string,
    description: string,
    createdAt: Date
    delete: boolean
}