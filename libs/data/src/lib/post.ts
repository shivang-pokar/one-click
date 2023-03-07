export class Post {
    id?: string;
    company_id?: string;
    post_data?: Array<PostData> = [];
    createdBy?: string;
    createdAt?: string;
    updatedBy?: string;
    updatedAt?: string;
    deleteFlag?: string;
}


export class PostData {
    id?: string;
    postDetails?: any;
    type?: string;
}