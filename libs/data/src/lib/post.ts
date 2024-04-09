import { PostContent } from "./post-content";

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


/* Post Container */
export class PostContainer {
    id?: string;
    company_id?: string;
    postContent?: Array<PostContent> = [];
    /**
    @DRAFT
    @SUCESS
    @FAIL
    @SCHEDULE
     */
    status?: string;
    keyIndex?: number;
    createdAt?: any;
    postDate?: any;

}