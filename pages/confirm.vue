<script setup lang="ts">
// /confirm is a special route, it handles all user login callbacks,
// so we allow it to contain /confirm
  const user = useSupabaseUser();
  watch(
    user, // user might not be logged in yet
    () => {
      if (user.value) {
        console.log("LOGIN REDIRECT - /pages/confirm.vue")
        if (user.value.role === 'authenticated') return navigateTo('/apply');
        else if (user.value.role === 'applicant') return navigateTo('/apply/status');
        return navigateTo('/dashboard', { replace: true }); // tenant, worker, admin
      }
    },
    { immediate: true }
  );
</script>
<template>
  <div>Logging you in...</div>
</template>
