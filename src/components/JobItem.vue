<template>
  <div class="job" @click="$router.push(`/edit/${job.id}`)">
    <div class="headOfJob">
      <h2>{{ job.name }}</h2>
      <p>{{ jobRole() }}</p>
    </div>
    <p>{{ job.phone }}</p>
  </div>
</template>

<script>
export default {
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
  methods: {
    jobRole() {
      let role;
      if (this.job.role == 'driver') {
        role = 'Водитель';
      } else if (this.job.role == 'waiter') {
        role = 'Официант';
      } else if (this.job.role == 'cook') {
        role = 'Повар';
      }
      return role;
    },
  },
};
</script>

<style lang="scss" scoped>
.job {
  width: 300px;
  border: 2px solid #618799ac;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 10px;
  color: rgba(0, 0, 0, 0.851);
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 5px;
    font-size: medium;
  }
}

.headOfJob {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  align-items: center;
  h1 {
    flex: 0 0 70%;
  }
  p {
    text-align: right;
    flex: 0 0 30%;
  }
}
</style>
