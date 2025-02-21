<script setup lang="ts">
const user = useSupabaseUser();



watch(
  user,
  () => {
    if (user.value && user.value.role && user.value.role!="authenticated") {
      return navigateTo('/dashboard');
    } else {
      return navigateTo('/');
    }
  },
  { immediate: true }
);
</script>
<template>
  <div v-if="user">
    <template v-if="user.role === 'authenticated'">
      <h2>Choose your path:</h2>
      <div class="flex gap-4">
        <button @click="applyAs('tenant')">Tenant</button>
        <button @click="applyAs('worker')">Worker</button>
      </div>
    </template>

    <template v-if="user.role === 'applicant'">
      <h2>Verification Required</h2>
      <input v-model="verificationCode" type="number" maxlength="6" />
      <button @click="verifyCode">Submit</button>
    </template>

    <template v-if="user.role === 'tenant'">
      <h2>Welcome to TKS Apartments</h2>
    </template>

    <template v-if="user.role === 'worker'">
      <h2>Good hunting...</h2>
    </template>

    <template v-if="user.role === 'admin'">
      <!-- Admin content -->
    </template>

    <template v-else>
      Logging in {{ user.role }} {{ user.email }}
    </template>
  </div>
</template>
