// server/api/create-session.ts
export default defineEventHandler(async (event) => {
    const { priceId } = await readBody(event)
    const stripe = require('stripe')(process.env.stripeSecretKey)

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/payment/cancel`
    })

    return { sessionId: session.id }
})