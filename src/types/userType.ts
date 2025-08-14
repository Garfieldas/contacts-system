export interface User {
    avatar?: File,
    collectionId: string,
    collectionName: string,
    created: Date,
    emailVisibility: boolean,
    id: string,
    name: string,
    permissions_id: string,
    updated: Date,
    username: string,
    verified: boolean
}