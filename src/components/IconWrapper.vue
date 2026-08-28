<template>
  <IconifyIcon :icon="name" />
</template>

<script setup>
import { Icon as IconifyIcon } from '@iconify/vue'

defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>
