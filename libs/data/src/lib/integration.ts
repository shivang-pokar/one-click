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
}