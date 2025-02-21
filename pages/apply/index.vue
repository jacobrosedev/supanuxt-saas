<script setup lang="ts">
import { usePhone, useDOB } from '~/composables/formatters.js';


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
// 'current page': int() saved in the Applicant Table

//  Applicant Table sets application process step

// Send Phone verification code
function submitform() {

}
function applyAs() { return  }

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const notifyStore = useNotifyStore();
const loading = ref(false);

const first = ref('')
const last = ref('')
const role = ref('')

// Turn this into a self-contained DOB input /component
const dob = ref('')
// Computed property that updates when dob.value changes
const dobFormat = computed(() => useDOB(dob.value))
// Update raw date string on input
const updateDob = (value) => {
  // Only store digits
  dob.value = value.replace(/\D/g, '')
}

// Turn this into a self-contained phone input /component
const phone = ref('')
// Computed property that updates when phone.value changes
const phoneFormat = computed(() => usePhone(phone.value))
// Update raw phone number on input
const updatePhone = (value) => {
  phone.value = value.replace(/\D/g, '')
}

// Now, create applicant in Applicants table, but don't change user.role in supabase yet
function verifyPhone() {

}
const script = [ // application control flow
  'phone', 'rental', 'skills',
]


watchEffect(() => {
  if (user.value) {
    // navigateTo('/auth/verify', { replace: true });
  }
});

</script>

<template><div class="container mx-auto p-6 border">

  <div class="text-center mb-12 border">
    <h2 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
      Apply to TKS Apartments
    </h2>
  </div>
  <!-- card container -->
  <div class="flex flex-col items-center pt-8 h-screen bg-gray-100 border">


    <!-- get applicant personal information component -->
    <div class="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-center">Personal Information</h1>

      <form @submit.prevent="verifyPhone()" class="space-y-4">
        
        <!-- first row of inputs -->
        <div class="inline-flex w-full gap-3">
          <div>
            <label for="first" class="block mb-2 font-bold">First name:</label>
            <input
              v-model="first"
              id="first"
              type="text"
              class="w-full p-2 border border-gray-400 rounded-md"
              placeholder="Enter your first name"
              maxlength="24"
              required />
          </div>

          <div>
            <label for="last" class="block mb-2 font-bold">Last name:</label>
            <input
              v-model="last"
              id="last"
              type="text"
              class="w-full p-2 border border-gray-400 rounded-md"
              placeholder="Enter your last name"
              maxlength="24"
              required />
          </div>
        </div>

        <!-- second row of inputs -->
        <div class="inline-flex w-full gap-3">

          <!-- this should be it's own /component with coupled /composable -->
          <div>
            <label for="phone" class="block mb-2 font-bold">Phone:</label>
            <input
              :value="phoneFormat"
              @input="updatePhone($event.target.value)"
              id="phone"
              type="phone"
              class="w-[128px] p-2 border border-gray-400 rounded-md"
              placeholder="(321) 654-0987"
              maxlength="14"
              required
            />
          </div>

          <!-- this should be it's own /component with coupled /composable -->
          <div>
            <label for="dob" class="block mb-2 font-bold">Date of birth:</label>
            <input
              :value="dobFormat"
            @input="updateDob($event.target.value)"
              id="dob"
              type="text"
              class="w-[116px] p-2 border border-gray-400 rounded-md"
              placeholder="MM/DD/YYYY"
              maxlength="10"
              required />
          </div>

          <div>
            <label for="role" class="block mb-2 font-bold">Role:</label>
            <select
              id="role"
              v-model="role"
              class="w-[100px] p-2 border border-gray-400 rounded-md"
              required
            > <option value="" disabled>Select:</option>
              <option value="tenant">Tenant</option>
              <option value="worker">Worker</option>              
            </select>
          </div>


        </div>
        
        <button
          :disabled="loading"
          type="submit"
          class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Verify Phone
        </button>

      </form>

    </div>
  </div>
</div>
</template>