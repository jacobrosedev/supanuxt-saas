<!-- ConcentricCircles.vue -->
<template>
    <div class="w-full max-w-lg mx-auto">
      <svg 
        :width="size" 
        :height="size" 
        :viewBox="`0 0 ${size} ${size}`" 
        class="mx-auto"
      >
        <!-- Molecular Circle -->
        <circle
          :cx="center"
          :cy="center"
          :r="radius * 3"
          class="fill-none stroke-gray-800"
          stroke-width="1"
        />
        <text
          :x="center"
          :y="center - (radius * 3 - 20)"
          class="text-sm text-center"
          text-anchor="middle"
        >
          Molecular
        </text>
  
        <!-- Atomic Circle -->
        <circle
          :cx="center"
          :cy="center"
          :r="radius * 2"
          class="fill-none stroke-gray-800"
          stroke-width="1"
        />
        <text
          :x="center"
          :y="center - (radius * 2 - 20)"
          class="text-sm text-center"
          text-anchor="middle"
        >
          Atomic
        </text>
  
        <!-- Subatomic Circle -->
        <circle
          :cx="center"
          :cy="center"
          :r="radius"
          class="fill-none stroke-gray-800"
          stroke-width="1"
        />
        <text
          :x="center"
          :y="center - (radius - 20)"
          class="text-sm text-center"
          text-anchor="middle"
        >
          Subatomic
        </text>
      </svg>
    </div>
  </template>
  
  <script setup>
  // Define component props with defaults
  const props = defineProps({
    size: {
      type: Number,
      default: 400
    },
    radius: {
      type: Number,
      default: 60
    }
  });
  
  // Calculate center point
  const center = props.size / 2;
  </script>