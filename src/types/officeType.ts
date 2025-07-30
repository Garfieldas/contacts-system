export interface Office {
    city: string,
    collectionId: string,
    collectionName: string,
    country: string,
    created: string,
    id: string,
    name: string,
    street: string,
    street_number: string,
    updated: string
}

export interface expandOffice {
    expand: {
        office_id: Office
    }
}