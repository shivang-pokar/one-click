import admin from './firebaseAdmin';
const db = admin.firestore();

/* Create Checkout Session */
export const createCheckoutSession = async (req, res, next) => {

    const user = await getUserDetails(req.headers.authorization);

    try {
        const session = await req.stripe.checkout.sessions.create({
            mode: 'subscription',
            customer_email: user.email,
            metadata: {
                companyId: user.company_id,
                uid: user.uid
            },
            payment_method_types: [],
            line_items: [
                {
                    price: process.env.STRIPE_SUBSCRIPTION_PLAN,
                    quantity: 1,
                },
            ],
            discounts: [
                {
                    coupon: req?.body?.couponCode || "",
                },
            ],
            success_url: `${process.env.STRIPE_RETURN_URL}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.STRIPE_RETURN_URL}?cancel`,
        });

        res.send({
            sessionId: session.id,
        });
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
        console.log('subscriptions')
        console.log(subscriptions)
        res.send(subscriptions);
    }
    catch (e) {
        next(e);
    }
    //console.log(subscriptions)
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
            let compnay = await getCompany(data.object.metadata.companyId);
            compnay.stripe_subscription_id = data.object.subscription;
            compnay.stripe_customer_id = data.object.customer;
            compnay.stripe_session_id = data.object.id;
            updateCompnay(compnay);
            // Payment is successful and the subscription is created.
            // You should provision the subscription and save the customer ID to your database.
            break;
        case 'invoice.paid':
            console.log('invoice.paid')
            let compnayData = await getCompanyOnSubscriptionId(data.object.subscription);
            let subscriptions = await req.stripe.subscriptions.retrieve(compnayData.stripe_subscription_id);
            compnayData.stripe_expires_at = subscriptions.current_period_end * 1000;
            compnayData.stripe_created = subscriptions.current_period_start * 1000;
            compnayData.status = data?.object?.status?.toUpperCase();
            updateCompnay(compnayData);
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
            let compnayDataDelete = await getCompanyOnSubscriptionId(data.object.subscription);
            compnayDataDelete.status = 'CANCELED';
            break;
        default:
        // Unhandled event type
    }

    res.send();
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

const updateCompnay = async (company) => {
    db.collection('company').doc(company.id).update(company);
}