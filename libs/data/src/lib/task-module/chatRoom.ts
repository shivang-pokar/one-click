export class ChatRoom {
    id?: string;
    company_id?: string;
    project_id?: string;
    is_group?: boolean;
    members?: { user_id: string; joined_at: number }[];
    createdBy?: string;
    createdAt?: number;
    room_name?: string;
    last_message?: object;
    deleteFlag?: string = "N";
}

export class ChatMessage {
    id?: string;
    room_id?: string;
    sender_id?: string;
    content?: string;
    media_url?: string;
    sent_at?: Date;
    read_by?: { user_id: string; read_at: Date }[];
    deleteFlag?: string = "N";
}