<template>
  <article>
    <label>
      <input type="checkbox" class="filled-in" :checked="packed" @change="onCheckOff(id)">
      <span>{{ value }}</span>
    </label>
  </article>
</template>

<script>
export default {
  props: ["packed", "id", "value", "onCheckOff"]
};
</script>
