export class IntegrationData {
    id?: string;
    company_id?: string;
    integrationList?: Array<any> = [];
}

export class Connection {
    id?: string;
    image?: string;
    socialName?: string;
    socialDescription?: string;
    color?: string;
    connected?: boolean;
    sendPost?: boolean;
    attachRequired?: boolean;
    badge?: number;
    charecterLimite: number = -1;
    imageRationMin: number = 0;
    imageRationMax: number = 0;
    videoLimite?: number = 1;
    shortVideo?: boolean;
    shortVideoRationMin?: number = 0;
    shortVideoRationMax?: number = 0;
}



export class Integration {
    id?: string;
    company_id?: string;
    integrationList?: Array<any> = [];
}

export class IntegrationItem {
    id?: string;
    access_token?: string;
    created_at?: string;
    date?: number;
    img?: string;
    is_selected?: boolean;
    name?: string;
    oauth_token_secret?: string;
    screen_name?: string;
    username?: string;
    type?: string;
}