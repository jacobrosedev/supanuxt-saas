<script setup lang="ts">
// Applicant home redirect, so they can view their TKS applications status
// Button to redirect to /auth/verify for "Verify Admin Code"
</script>
<template>
  <div class="container mx-auto p-6">
    <div class="text-center mb-12">
      <h2
        class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
        Tenant | Worker Application Status
      </h2>
      <p>Your application is being reviewed. Please wait for admin approval.</p>
      <div class="block flex w-full border">
        <button class="border">
          verify
        </button>
        <button class="border">
          review
        </button>
      </div>
    </div>

  </div>
</template>
