<script setup>
// https://keith-mifsud.me/blog/build-and-deploy-nuxt3-static-site-with-pinia-and-stripe-checkout-on-firebase





// import {loadStripe} from '@stripe/stripe-js';
// const config = useRuntimeConfig();
// const stripe = await loadStripe(config.public.stripePublicTest);
// // const { data: product } = await useFetch('/server/api/get-product')



const handlePayment = async () => {
//  const { data } = await useFetch('/server/api/create-session', {
//    method: 'POST',
//    body: { priceId: product.value.default_price }
//  })
 
//  await stripe.redirectToCheckout({
//    sessionId: data.sessionId
//  })
}
</script>

<template>
  <div> <h2>Tenant Rent Payment</h2>
    <div v-if="product" class="p-6 max-w-md mx-auto">
<!--       
      <h2 class="text-xl font-bold">{{ product.name }}</h2>
      <p class="mt-2">${{ product.default_price.unit_amount / 100 }}</p> -->
      <button @click="handlePayment" class="mt-4 w-full bg-blue-500 text-white p-2 rounded"
      >Pay Now</button>
    </div>

  </div>
 
</template>