export class PostContent {
    id: string = "";
    content: string = "";
    attachment: Array<any> = [];
    created_at: number = new Date().getTime();
}