<script setup lang="ts">
// stage 2 of application process for all users
// this component opens after user has entered a phone number, or if we already have their phone number
// maybe they want to verify again, there's an input for a 6 digit code that was sent to their phone
// you can input the code, resend the code, and click the Verify Code submit form button
// when the code is being verified on the backend, we display a spinner
// if the code comes back valid, then we send a finished emit to the parent page
// if the code comes back invalid, we display an error notification

const supabase = useSupabaseClient();
const loading = ref(true);
const pin = ref('')

// Send Phone verification code
function verifyPhoneCode() {
  console.log("verify phone code")
}

// we're done loading now, watch refs...
loading.value = false;
</script>

<template>
  <!-- card container -->
  <div class="flex flex-col items-center pt-8 h-screen bg-gray-100 border">


    <form class="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-lg"
      @submit.prevent="verifyPhoneCode()"
    >
      <h1 class="text-3xl font-bold text-center">Verify 6-digit Phone Code</h1>
      <div>
        <label for="phone" class="block mb-2 font-bold">6-Digit Code:</label>
        <input
          :value="pin"
          id="pin"
          type="pin"
          class="w-[128px] p-2 border border-gray-400 rounded-md"
         
          required
        />
      </div>
      <div class="inline-flex w-full gap-4">
        <button
        :disabled="loading"
        class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
        Resend Code
        </button>
        <button
        :disabled="loading"
        type="submit"
        class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
        Verify Code
        </button>
      </div>

    </form>
  </div>
</template>