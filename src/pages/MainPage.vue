<template>
  <prime-button
    id="filtres"
    icon="pi pi-filter"
    class="p-button-rounded p-button-warning"
    @click="showFilter"
  />
  <filter-dialog
    :filterOptions="$store.state.filterOptions"
    v-model:filters="filters"
    v-model:isShow="isShowFilters"
  />
  <div class="headOfPage">
    <h1>Список сотрудников</h1>
    <div class="sort-addnew">
      <job-select
        id="sorting"
        :placeholder="'Сортировка не выбрана'"
        v-model:modelValue="selectedSort"
        :options="$store.state.sortOptions"
      />
      <prime-button
        id="addJobBtn"
        icon="pi pi-plus"
        class="p-button-rounded"
        @click="$router.push('/create-new-job')"
      />
    </div>
  </div>
  <job-list :jobs="sortedAndFilteredJobs"></job-list>
</template>

<script>
import JobList from '@/components/JobList.vue';
export default {
  components: { JobList },
  data() {
    return {
      isShowFilters: false,
    };
  },
  methods: {
    showFilter() {
      this.isShowFilters = !this.isShowFilters;
    },
  },
  computed: {
    selectedSort: {
      get() {
        return this.$store.state.selectedSort;
      },
      set(value) {
        this.$store.commit('updateSelectedSort', value);
      },
    },
    filters: {
      get() {
        return this.$store.state.filters;
      },
      set(value) {
        this.$store.commit('updateFilters', value);
      },
    },
    sortedAndFilteredJobs() {
      return this.$store.getters.sortedAndFiltredJobs;
    },
  },
};
</script>

<style lang="scss" scoped>
.headOfPage {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
}
h1 {
  margin: 20px 0;
}
#filtres {
  position: fixed;
  z-index: 10;
  height: 60px;
  width: 60px;
  bottom: 15%;
  right: 5%;
  @media screen and (min-width: 767px) {
    bottom: 20%;
    right: 20%;
  }
  @media screen and (min-width: 1439px) {
    height: 75px;
    width: 75px;
    bottom: 20%;
    right: 30%;
  }
}

.sort-addnew {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
  #addJobBtn {
    margin-left: 10px;
  }
}
</style>
