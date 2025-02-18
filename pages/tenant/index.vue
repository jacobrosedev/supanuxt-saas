<script setup lang="ts">
  definePageMeta({
    middleware: ['auth']
  });

  // useRoles Composable for RBAC
  const { isAdmin, isWorker, isTenant } = useRoles();

</script>
<template>
  <div
    class="flex flex-col items-center max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div class="text-center mb-12">
      <h2 v-if="isTenant"
        class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
        Tenant Dashboard
      </h2>
    </div>
  </div>
</template>
