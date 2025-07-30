export interface Department {
    collectionId: string,
    collectionName: string,
    created: string,
    id: string,
    name: string,
    updated: string,
}

export interface expandDepartment {
    expand: {
        department_id: Department
    }
}