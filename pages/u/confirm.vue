<script setup lang="ts">
definePageMeta({
    middleware: ['rbac']
});
const user = useSupabaseUser();

watch(
  user,
  () => {
    if (user.value && user.value.role!="authenticated") {
      return navigateTo('/dashboard');
    }
  },
  { immediate: true }
);
</script>
<template>
  <div>
    <div v-if="user">
      <template v-if="user.role = 'authenticated'">
        You must wait for an admin to send you a 6-digit code.
        Once they do, enter it here: [6-digit pin input]
      </template>
      <template v-else>
        Logging in {{ user.role }} {{ user.email }}
      </template>
    </div>
  </div>
</template>
