<script setup lang="ts">
// /confirm is a special route, it handles all user login callbacks,
// so we allow it to contain /confirm
  const user = useSupabaseUser();
  watch(
    user, // user might not be logged in yet
    () => {
      if (user.value) {
        if (user.value.role === 'authenticated') return navigateTo('/apply');
        else if (user.value.role === 'applicant') return navigateTo('/verify');
        else return navigateTo('/dashboard'); // tenant, worker, admin
      }
    },
    { immediate: true }
  );
</script>
<template>
  <div>Logging you in...</div>
</template>
