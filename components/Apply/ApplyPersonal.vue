<script setup lang="ts"> // stage 1 of application process for all users


function submit() { // Send Phone verification code
  console.log("application")
}

const loading = ref(true);


const first = ref('');
const last = ref('');
const role = ref('');
const phone = ref('');
const dob = ref('');

</script>

<template>

  <div>
    <!-- get applicant personal information component -->
    <form @submit.prevent="submit()" class="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-center">Personal Information</h1>

        
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

        <InputPhone required />

        <InputDate required />

        <div>
          <label for="role" class="block mb-2 font-bold">Role Type:</label>
          <select
            id="role"
            v-model="role"
            class="w-[120px] p-2 border border-gray-400 rounded-md"
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
</template>