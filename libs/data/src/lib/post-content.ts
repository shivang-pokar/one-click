export class PostContent {
    id: string = "";
    post_id?: string;
    user_id: string = "";
    message: string = "";
    type: string = "";
    access_token: string = "";
    attachment: Array<any> = [];
    created_at: number = new Date().getTime();
}