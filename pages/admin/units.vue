<script setup lang="ts">
    // Admin-only Daisy UI datatable that displays all units with status tags
    // a unit can be clicked on to see an expanded view with linked fixes, tenants, etc.
    // every unit has a jsonb of structure_properties for unchanging props like beds, baths, sqft, amenities
</script>
<template>
  <div class="container mx-auto p-6">
    <div class="text-center mb-12">
      <h2
        class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
        Admin Units Table
      </h2>
    </div>

  </div>
</template>
