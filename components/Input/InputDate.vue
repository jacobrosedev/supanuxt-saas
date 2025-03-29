<script setup lang="ts">
import { useDOB } from '~/composables/formatters.js';
const model = defineModel()
const dobFormat = computed(() => useDOB(model.value))
const updateDob = (event) => {
  model.value = event.target.value.replace(/\D/g, '')
}
</script>

<template>
  <div  class="form-control">
    <label for="dob" class="block mb-2 font-bold">Date of birth:</label>
    <input class="w-[124px] p-2 border border-gray-400 rounded-md"
      placeholder="MM/DD/YYYY" maxlength="10" id="dob" type="text"
      @input="updateDob" :value="dobFormat" required
    />
  </div>
</template>