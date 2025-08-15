export interface Group {
    collectionId: string,
    collectionName: string,
    created: string,
    id: string,
    name: string,
    updated: string,
}

export interface expandGroup {
    expand: {
        group_id: Group
    }
}