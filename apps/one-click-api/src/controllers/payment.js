import admin from './firebaseAdmin';
const db = admin.firestore();

/* Create Checkout Session */
export const createCheckoutSession = async (req, res, next) => {

    const user = await getUserDetails(req.headers.authorization);

    try {

        let sessionData = {
            mode: 'subscription',
            customer: req.body.customerId,
            metadata: {
                companyId: user.company_id,
                uid: user.uid
            },
            payment_method_types: ['card'],
            line_items: [
                {
                    price: process.env.STRIPE_SUBSCRIPTION_PLAN,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.STRIPE_RETURN_URL}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.STRIPE_RETURN_URL}?cancel`,
            allow_promotion_codes: true
        }

        if (req?.body?.couponCode) {
            sessionData.discounts = [
                {
                    coupon: req.body.couponCode,
                },
            ];
        }

        const session = await req.stripe.checkout.sessions.create(sessionData);

        res.send({ sessionId: session.id });
    } catch (e) {
        res.status(400);
        return res.send({
            error: {
                message: e.message,
            }
        });
    }
}

/* Create Portal Session */
export const createPortalSession = async (req, res, next) => {
    const { session_id } = req.body;
    const checkoutSession = await req.stripe.checkout.sessions.retrieve(session_id);
    const returnUrl = process.env.STRIPE_RETURN_URL;
    const portalSession = await req.stripe.billingPortal.sessions.create({
        customer: checkoutSession.customer,
        return_url: returnUrl,
    });

    res.send(portalSession);
}

export const cancelSubscriptions = async (req, res, next) => {
    try {
        const { subscriptions_id } = req.body;
        const subscriptions = await req.stripe.subscriptions.cancel(subscriptions_id);
        res.send(subscriptions);
    }
    catch (e) {
        next(e);
    }
}

export const resumeSubscriptions = async (req, res, next) => {
    try {
        const { subscriptions_id } = req.body;
        const subscriptions = await req.stripe.subscriptions.resume(subscriptions_id);
        res.send(subscriptions);
    }
    catch (e) {
        next(e);
    }
    //console.log(subscriptions)
}

export const validateCoupon = async (req, res, next) => {
    const { couponCode } = req.body;
    try {
        const coupon = await req.stripe.coupons.retrieve(couponCode);
        res.send(coupon);
    } catch (error) {
        next(error);
        res.status(400);
        if (error.code === 'resource_missing') {
            res.send({ message: `Invalid coupon code: ${couponCode}` });
        } else {
            res.send({ message: `Error validating coupon: ${error.message}` });
        }
    }
}

/* retrieveAllPlans */

export const retrieveAllPlans = async (req, res, next) => {
    try {
        const plans = await req.stripe.plans.list();

        for (const plan of plans.data) {
            const product = await req.stripe.products.retrieve(plan.product);
            plan.product = product;
        }

        res.send(plans.data)
    }
    catch (error) {
        next(error);
    }
}


/* Stripe Webhook */


export const webHook = async (req, res, next) => {

    console.log('webHook')

    let data;
    let eventType;
    // Check if webhook signing is configured.
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret) {
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event;
        let signature = req.headers["stripe-signature"];

        try {
            event = req.stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`);
            return res.sendStatus(400);
        }
        // Extract the object from the event.
        data = event.data;
        eventType = event.type;
    } else {
        // Webhook signing is recommended, but if the secret is not configured in `config.js`,
        // retrieve the event data directly from the request body.
        data = req.body.data;
        eventType = req.body.type;
    }

    switch (eventType) {
        case 'checkout.session.completed':
            console.log('checkout.session.completed');
            setSubScriptionData(data.object.metadata.companyId, data.object.subscription, data.object.id, req.stripe)
            // Payment is successful and the subscription is created.
            // You should provision the subscription and save the customer ID to your database.
            break;
        case 'invoice.paid':
            console.log('invoice.paid')
            setSubScriptionDataOnInvoicePaid(data.object.customer);
            // Continue to provision the subscription as payments continue to be made.
            // Store the status in your database and check when a user accesses your service.
            // This approach helps you avoid hitting rate limits.
            break;
        case 'invoice.payment_failed':
            console.log('invoice.payment_failed')
            // The payment failed or the customer does not have a valid payment method.
            // The subscription becomes past_due. Notify your customer and send them to the
            // customer portal to update their payment information.
            break;
        case 'customer.subscription.deleted':
            console.log('customer.subscription.deleted');
            let compnayDataDelete = await getCompanyOnCustomerId(data.object.customer);
            compnayDataDelete.status = 'CANCELED';
            break;
        default:
        // Unhandled event type
    }

    res.send();
}


const setSubScriptionData = async (companyId, subscriptionId, stripe_session_id, stripe) => {
    let compnay = await getCompany(companyId);
    let subscriptions = await stripe.subscriptions.retrieve(subscriptionId);
    compnay = setSubscriptionDataInCompany(compnay, subscriptionId, subscriptions, stripe_session_id)
    updateCompnay(compnay);
}

const setSubscriptionDataInCompany = (compnayData, subscriptionId, subscriptionData, stripe_session_id) => {
    compnayData.stripe_subscription_id = subscriptionId;
    compnayData.stripe_expires_at = subscriptionData.current_period_end * 1000;
    compnayData.stripe_created = subscriptionData.current_period_start * 1000;
    compnayData.status = data?.object?.status?.toUpperCase();
    if (stripe_session_id) {
        compnayData.stripe_session_id = stripe_session_id;
    }
    return stripe_session_id;
}

const setSubScriptionDataOnInvoicePaid = async (customerId) => {
    let compnayData = await this.getCompanyOnCustomerId(customerId);
    if (compnayData.stripe_subscription_id) {
        let subscriptions = await stripe.subscriptions.retrieve(compnayData.stripe_subscription_id);
        compnayData = setSubscriptionDataInCompany(compnayData, compnayData.stripe_subscription_id, subscriptions, null);
        updateCompnay(compnayData);
    }
}


export const createUserInStripe = async (req, res, next) => {
    const customer = await req.stripe.customers.create({
        email: req.body.email,
        name: req.body.name,
        metadata: {
            company_id: req.body.id,
        }
    });
    res.send(customer);
}


const getUserDetails = async (idToken) => {
    return new Promise(async (resolve, reject) => {
        const authService = admin.auth();
        const resToken = await authService.verifyIdToken(idToken);
        const userReq = await db.collection("users").doc(resToken.uid).get();
        const user = userReq.data();
        resolve(user);
    })
}

const getCompany = async (companyId) => {
    return new Promise(async (resolve, reject) => {
        const companyReq = await db.collection("company").doc(companyId).get();
        const company = companyReq.data();
        resolve(company);
    })
}

const getCompanyOnSubscriptionId = async (subscriptionId) => {
    return new Promise(async (resolve, reject) => {
        const companyReq = await db.collection("company").where('stripe_subscription_id', '==', subscriptionId).get();
        companyReq.forEach(company => {
            resolve(company.data());
        });
    });
}

const getCompanyOnCustomerId = async (customerId) => {
    return new Promise(async (resolve, reject) => {
        const companyReq = await db.collection("company").where('stripe_customer_id', '==', customerId).get();
        companyReq.forEach(company => {
            resolve(company.data());
        });
    });
}

const updateCompnay = async (company) => {
    db.collection('company').doc(company.id).update(company);
}


export const getSubscriptionPaymentHistory = async (req, res, next) => {
    const invoices = await req.stripe.invoices.list({
        subscription: req.body.subscriptionId,
        limit: 10
    })

    const paymentPromises = invoices.data.map(async invoice => {
        const plan = await req.stripe.plans.retrieve(invoice.lines.data[0].plan.id);
        return {
            ...invoice,
            planName: plan.nickname || 'One Click Basic'
        };
    });

    const payments = await Promise.all(paymentPromises);

    res.send(payments || []);
}
