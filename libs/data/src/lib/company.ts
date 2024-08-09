export class Company {
    id?: string;
    company_name?: string;
    timeZone?: string;
    createdBy?: string;
    updatedBy?: string;
    deleteFlag?: string;
    masterId?: string;
    status?: string;
    stripe_customer_id?: string;
    stripe_subscription_id?: string;
    stripe_created?: number;
    stripe_expires_at?: number;
    labels?: Array<any> = [];
    email?: string
}