export class Project {
    id?: string;
    company_id?: string
    projectName?: string;
    projectDescription?: string;
    createdBy?: string;
    createdAt?: string;
    updatedBy?: string;
    updatedAt?: string;
    deleteFlag?: string;
    label?: string;
    lastOpened?: string;
    completed: boolean = false;
    trashed: boolean = false;
    isTemplate: boolean = false;
}