<script setup lang="ts">
type Type = 'button' | 'submit' | 'reset';
type Variant = 'primary' | 'secondary' | 'success' | 'warning';
type Size = 'small' | 'medium' | 'large';

withDefaults(
  defineProps<{
    type?: Type;
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'medium',
    disabled: false,
  }
);
</script>

<template>
  <button
    class="text-lg rounded-sm cursor-pointer transition-colors duration-300 m-[5px]"
    :class="{
      'py-1 px-2.5 text-sm': size === 'small',
      'py-2.5 px-5': size === 'medium',
      'py-3 px-6 text-xl': size === 'large',
      'bg-blue-600 text-white hover:bg-blue-500': variant === 'primary',
      'bg-gray-600 text-white hover:bg-gray-500': variant === 'secondary',
      'bg-green-600 text-white hover:bg-green-500': variant === 'success',
      'bg-yellow-600 text-white hover:bg-yellow-500': variant === 'warning',
      '!opacity-50 !cursor-not-allowed !bg-[#6c757d]': disabled,
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
