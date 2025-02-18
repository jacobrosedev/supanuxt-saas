// server/api/get-product.ts
export default defineEventHandler(async () => {
    const stripe = require('stripe')(process.env.stripeSecretKey)
    const product = await stripe.products.retrieve('prod_Pqpm24yHeSUfnD', {
        expand: ['default_price']
    })
    return product
})