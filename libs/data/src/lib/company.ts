export class Company {
    id?: string;
    email?: string = '';
    company_name?: string;
    timeZone?: string;
    createdBy?: string;
    createdAt?: string;
    updatedBy?: string;
    updatedAt?: string;
    deleteFlag?: string;
    masterId?: string;
    status?: string;
    stripe_customer_id?: string;
    stripe_subscription_id?: string;
    stripe_created?: number;
    stripe_expires_at?: number;
    labels?: Array<any> = [];
}