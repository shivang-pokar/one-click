export class Task {
    id?: string;
    company_id?: string;
    createdBy?: string;
    createdAt?: string;
    updatedBy?: string;
    updatedAt?: string;
    deleteFlag: string = "N";
    taskName?: string;
    description?: string;
    status?: string;
    assignee?: Array<string>;
    due?: string;
    priority?: string;
    summary?: string;
    label?: Array<string>;
    taskType?: TaskType;
    icon?: string;
    completed: boolean = false;
    project_id?: string;
    group_id?: string;

    subTasks?: any;
}

export enum TaskType {
    GROUP = "GROUP",
    TASK = "TASK"
}

export class Group {
    id?: string;
    company_id?: string;
    project_id?: string;
    groupName?: string;
    status?: string;
    createdBy?: string;
    createdAt?: string;
    updatedBy?: string;
    updatedAt?: string;
    deleteFlag: string = "N";
    completed: boolean = false;
    isOpen: boolean = true;
}