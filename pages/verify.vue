<script setup lang="ts">
// You should present a form to the user so they can input the 6 digit pin, then send it along with the phone number to verifyOtp:

// const {
//   data: { session },
//   error,
// } = await supabase.auth.verifyOtp({
//   phone: '13334445555',
//   token: '123456',
//   type: 'sms',
// })
// If successful the user will now be logged in and you should receive a valid session like:

// {
//   "access_token": "<ACCESS_TOKEN>",
//   "token_type": "bearer",
//   "expires_in": 3600,
//   "refresh_token": "<REFRESH_TOKEN>"
// }
// The access token can be sent in the Authorization header as a Bearer token for any CRUD operations on supabase-js. See our guide on Row Level Security for more info on restricting access on a user basis.



// stage 2 of application process for all users
// this component opens after user has entered a phone number, or if we already have their phone number
// maybe they want to verify again, there's an input for a 6 digit code that was sent to their phone
// you can input the code, resend the code, and click the Verify Code submit form button
// when the code is being verified on the backend, we display a spinner
// if the code comes back valid, then we send a finished emit to the parent page
// if the code comes back invalid, we display an error notification
const user = useSupabaseUser()
const supabase = useSupabaseClient();
const pin = ref('')



// Send Phone verification code
function verifyPhoneCode() {
  console.log("verify phone code")
  
}
</script>

<template>
  <!-- card container -->
  <div class="flex flex-col items-center pt-8 h-screen bg-gray-100 border">


    <form class="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-lg"
      @submit.prevent="verifyPhoneCode()"
    >
      <h1 class="text-3xl font-bold text-center">Verify 6-digit Phone Code</h1>
      

      <div>Email: {{ user.email }}</div>
      <div>Phone: {{ user.phone }}</div>
      <div>Role: {{ user.role }}</div>


      <div class="inline-flex w-full gap-3 items-center">
        <label for="phone" class="block mb-2 font-bold">PIN:</label>
        <input
          :value="pin"
          id="pin"
          type="pin"
          class="w-[128px] p-2 border border-gray-400 rounded-md w-full"
          maxlength="6"
          required
        />
      </div>

      <div class="inline-flex w-full gap-4">
        <button
        class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
        Resend Code
        </button>
        <button
        type="submit"
        class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
        Verify Code
        </button>
      </div>

    </form>
  </div>
</template>