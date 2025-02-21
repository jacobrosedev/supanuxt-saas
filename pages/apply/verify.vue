<script setup lang="ts">
const user = useSupabaseUser();

const verificationCode = ref("707070")
function verifyCode() {

}

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
    <template v-if="user.role === 'applicant'">
      <h2>Verification Required</h2>
      <input v-model="verificationCode" type="number" maxlength="6" />
      <button @click="verifyCode">Submit</button>
    </template>

    <template v-else>
      {{ user.email }} logged in as {{ user.role }}
    </template>
  </div>
</template>
