export interface Company {
    collectionId: string,
    collectionName: string,
    created: string,
    id: string,
    name: string,
    updated: string,
}

export interface expandCompany {
    expand: {
        company_id: Company
    }
}