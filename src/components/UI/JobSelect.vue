<template>
  <PrimeTreeSelect
    :placeholder="placeholder"
    :options="options"
    v-model:modelValue="selectedRole"
    selectionMode="single"
  />
</template>

<script>
export default {
  name: 'job-select',
  props: {
    modelValue: {
      type: [String, Object],
    },
    options: { type: Array, default: () => [] },
    placeholder: { type: String },
  },
  methods: {},
  computed: {
    selectedRole: {
      get() {
        const role = {};
        role[this.modelValue] = true;
        return role;
      },
      set(value) {
        const role = Object.keys(value)[0];
        return this.$emit('update:modelValue', role);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
select {
  text-align: center;
  width: min-content;
  margin-bottom: 5px;
}
</style>
