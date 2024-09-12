export class Comments {
    id?: string;
    company_id?: string;
    project_id?: string;
    task_id?: string;
    comment?: string;
    createdBy?: string;
    createdAt?: string;
    updatedBy?: string;
    updatedAt?: string;
    deleteFlag?: string = "N";

    showInput:boolean = false;
}