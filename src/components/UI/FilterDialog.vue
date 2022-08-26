<template>
  <prime-dialog v-model:visible="visible" :modal="true">
    <template #header>
      <h3>Фильтры</h3>
    </template>

    <div class="filtres">
      <job-select
        :placeholder="'Профессия не выбрана'"
        :modelValue="role"
        v-model="role"
        :options="filterOptions.role"
      ></job-select>

      <div class="filter-checkbox">
        <prime-checkbox v-model="isArchive" :binary="true" />
        <p>В архиве?</p>
      </div>
    </div>

    <template #footer>
      <prime-button
        label="Принять"
        icon="pi pi-check"
        autofocus
        @click="visible = false"
      />
    </template>
  </prime-dialog>
</template>

<script>
export default {
  name: 'filter-dialog',
  data() {
    return {
      optionsRole: [
        {
          key: '0',
          label: 'Профессия',
          data: '',
          icon: 'pi pi-fw pi-inbox',
        },
        {
          key: '1',
          label: 'Водитель',
          data: 'driver',
          icon: 'pi pi-fw pi-inbox',
        },
        {
          key: '2',
          label: 'Официант',
          data: 'waiter',
          icon: 'pi pi-fw pi-inbox',
        },
        {
          key: '3',
          label: 'Повар',
          data: 'cook',
          icon: 'pi pi-fw pi-inbox',
        },
      ],
    };
  },
  props: {
    isShow: {
      type: Boolean,
    },
    filters: { type: Object },
    filterOptions: { type: Object },
  },

  computed: {
    visible: {
      get() {
        return this.isShow;
      },
      set(value) {
        return this.$emit('update:isShow', value);
      },
    },
    role: {
      get() {
        return this.filters.role;
      },
      set(value) {
        const doneFilters = {
          role: value,
          isArchive: this.filters.isArchive,
        };
        return this.$emit('update:filters', doneFilters);
      },
    },
    isArchive: {
      get() {
        return this.filters.isArchive;
      },
      set(value) {
        let isArchiveDone;
        if (value) {
          isArchiveDone = value;
        } else {
          isArchiveDone = '';
        }
        const doneFilters = {
          role: this.filters.role,
          isArchive: isArchiveDone,
        };
        this.$emit('update:filters', doneFilters);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.filtres {
  min-width: 250px;
  min-height: 50px;
  max-width: 500px;
  max-height: 100px;
  display: flex;
  align-content: center;
  align-items: center;
  .filter-checkbox {
    display: flex;
    margin-left: 15px;
    p {
      margin-left: 10px;
    }
  }
}
</style>
