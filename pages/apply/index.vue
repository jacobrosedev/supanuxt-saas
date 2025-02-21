<script setup lang="ts">

// this page reads the user.raw_user_meta_data to see what they have entered so far, then will redirect
// them to the appropriate location in the tks application process, with the data from the database they previously entered.
// 
// The application process may be long, so this allows us to handle page refreshes, or complete an application at a later time.

// if the user is not signed in, they get redirected to /signup
// if the user is signed in, but they haven't filled out their information, we load the ProfileComponent
// if the profile is completed, we 


// this page allows public users to create a supabase user, but then redirects them to either
// tenant or worker based on their initial selection apply to TKS apartments as either a worker, or tenant
// through a sequence of forms.
// 



// /apply handles dynamic component loading based on a supabase
//   db connection to the user.value.raw_user_meta_data
// using supabase to save raw_user_meta_data at each "checkpoint" in the process,
//   ensures we can scan back to where we left off (ex.page reload)
// once the application process is completed, we move the temporary json data into a special
// table for all applicants



// we use a card system to display steps in the application process,
// each step submits a form, and once supabase pings back 'good', we
// increment the integer used to distinguish the step sent back.
// supabase returns that the data was saved properly, and has a
// 'current page': int() saved in the Applicant

// Send Phone verification code
const sendResetPasswordLink = async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      email.value,
      {
        redirectTo: `${config.public.siteRootUrl}/auth/reset`
      }
    );
    if (error) throw error;
    else
      notifyStore.notify(
        'Password Reset link sent, check your email.',
        NotificationType.Success
      );
  } catch (error) {
    notifyStore.notify(error, NotificationType.Error);
  } finally {
    loading.value = false;
  }
};


function applyAs() { return  }

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const notifyStore = useNotifyStore();
const loading = ref(false);

const script = [ // application control flow
  'phone', 'name',
  'tenant', 'worker',
  'rental', 'skills',
]
watchEffect(() => {
  if (user.value) {
    // navigateTo('/auth/verify', { replace: true });
  }
});
</script>

<template><div class="container mx-auto p-6 border">

  <div class="text-center mb-12">
    <h2 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
      Apply to TKS Apartments
    </h2>
  </div>

  <div class="flex flex-col items-center pt-8 h-screen bg-gray-100 border">
    <div class="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-lg ">
      <h2>Update Name & Phone:</h2>
      <div class="flex gap-4">
        <button @click="applyAs()">Tenant</button>
      </div>
      <h2>it actually makes sense for tenant to /apply and for workers to be added by an admin...</h2>
    </div>
  </div>

  <div class="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-center">Forgot Pasword</h1>
    <form @submit.prevent="sendResetPasswordLink" class="space-y-4">
      <div>
        <label for="email" class="block mb-2 font-bold">Email</label>
        <input
          v-model="email"
          id="email"
          type="email"
          class="w-full p-2 border border-gray-400 rounded-md"
          placeholder="Enter your email"
          required />
      </div>
      <button
        :disabled="loading || email === ''"
        type="submit"
        class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
        Send Reset Password Link
      </button>
    </form>
  </div>

</div></template>