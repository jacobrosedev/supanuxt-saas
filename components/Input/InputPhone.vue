<script setup lang="ts">
import { usePhone } from '~/composables/formatters.js';
const model = defineModel()
const phoneFormat = computed(() => usePhone(model.value))
const updatePhone = (event) => {
  model.value = event.target.value.replace(/\D/g, '')
}
</script>

<template>
  <div class="form-control">
    <label for="phone" class="block mb-2 font-bold">Phone:</label>
    <input class="w-[128px] p-2 border border-gray-400 rounded-md"
      placeholder="(321) 654-0987" maxlength="14" id="phone" type="phone"
      @input="updatePhone" :value="phoneFormat" required
    />
  </div>
</template>