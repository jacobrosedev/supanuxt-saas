<!-- pages/pay/now.vue -->
<script setup>
const { data: product } = await useFetch('/api/get-product')
const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY)

const handlePayment = async () => {
 const { data } = await useFetch('/api/create-session', {
   method: 'POST',
   body: { priceId: product.value.default_price }
 })
 
 await stripe.redirectToCheckout({
   sessionId: data.sessionId
 })
}
</script>

<template>
 <div v-if="product" class="p-6 max-w-md mx-auto">
   <h2 class="text-xl font-bold">{{ product.name }}</h2>
   <p class="mt-2">${{ product.default_price.unit_amount / 100 }}</p>
   <button 
     @click="handlePayment"
     class="mt-4 w-full bg-blue-500 text-white p-2 rounded"
   >
     Pay Now
   </button>
 </div>
</template>