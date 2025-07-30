export interface Division {
    collectionId: string,
    collectionName: string,
    created: string,
    id: string,
    name: string,
    updated: string,
}

export interface expandDivision {
    expand: {
        division_id: Division
    }
}