<template>
  <div class="job-list">
    <job-item :key="job.id" v-for="job of jobs" :job="job"></job-item>
  </div>
</template>

<script>
import JobItem from './JobItem.vue';
export default {
  components: { JobItem },
  props: { jobs: { type: Array, required: true } },
};
</script>

<style lang="scss" scoped>
.job-list {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>
