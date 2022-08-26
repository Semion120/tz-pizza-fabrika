<template>
  <h1>Сотрудник с ID: {{ $route.params.id }}</h1>
  <div class="data-container">
    <div class="personal-data">
      <svg
        width="1280.000000pt"
        height="1188.000000pt"
        viewBox="0 0 1280.000000 1188.000000"
        preserveAspectRatio="xMidYMid meet"
        class="staple"
      >
        <use xlink:href="#staple"></use>
      </svg>
      <h2>Карточка сотрудника</h2>
      <div class="info-block">
        <b>Имя:</b>
        <p>{{ activeJob.name }}</p>
      </div>
      <div class="info-block">
        <b>День рождения:</b>
        <p>{{ activeJob.birthday }}</p>
      </div>
      <div class="info-block">
        <b>В архиве?</b>
        <p>{{ isArchiveInfo }}</p>
      </div>
      <div class="info-block">
        <b>Должность:</b>
        <p>{{ roleInfo }}</p>
      </div>
      <div class="info-block">
        <b>Телефон:</b>
        <p>{{ activeJob.phone }}</p>
      </div>
    </div>
    <div class="change-data">
      <h2>Изменить данные сотрудника</h2>
      <div class="data-forms">
        <div class="data-column1">
          <div class="name-container input">
            <prime-InputText
              :placeholder="activeJob.name"
              v-model="editedJob.name"
              type="text"
            />
          </div>
          <div class="birthday-container input">
            <prime-InputMask
              v-model="editedJob.birthday"
              mask="99.99.9999"
              slotChar="mm.dd.yyyy"
            />
          </div>
        </div>

        <div class="data-column2">
          <div class="role-container input">
            <p class="error" v-if="roleError">{{ roleError }}</p>
            <job-select
              :placeholder="'Профессия не выбрана'"
              :modelValue="editedJob.role"
              v-model="editedJob.role"
              :options="$store.getters.roleOptionsForCreate"
            ></job-select>
          </div>
          <div class="phone-container input">
            <prime-InputMask
              v-model="editedJob.phone"
              mask="+7 (999) 999-9999"
            />
          </div>
        </div>
      </div>
      <div class="save-btn">
        <div class="filter-checkbox">
          <prime-checkbox v-model="editedJob.isArchive" :binary="true" />
          <p>В архиве?</p>
        </div>
        <prime-button
          label="СОХРАНИТЬ"
          :class="buttonToggle"
          @click="saveEditInfo"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeJob: this.$store.getters.getActiveJob(this.$route.params.id),
      editedJob: this.$store.getters.getActiveJob(this.$route.params.id),
      buttonToggle: 'p-button-success p-disabled',
      roleError: '',
    };
  },
  methods: {
    checkRole() {
      const job = this.editedJob;
      let haveErrors = false;
      if (!job.role) {
        this.roleError = 'Пожалуйста, выберите профессию';
        haveErrors = true;
      } else {
        this.roleError = '';
      }
      return haveErrors;
    },
    saveEditInfo() {
      if (!this.checkRole()) {
        this.$store.commit('editJobs', this.editedJob);
        this.$router.push('/');
      }
    },
  },
  computed: {
    roleInfo() {
      let roleRu;
      if (this.activeJob.role == 'driver') {
        roleRu = 'Водитель';
      } else if (this.activeJob.role == 'waiter') {
        roleRu = 'Официант';
      } else if (this.activeJob.role == 'cook') {
        roleRu = 'Повар';
      }
      return roleRu;
    },
    isArchiveInfo() {
      let isArchive;
      if (this.activeJob.isArchive) {
        isArchive = 'Да';
      } else {
        isArchive = 'Нет';
      }
      return isArchive;
    },
  },
  watch: {
    editedJob: {
      handler() {
        if (JSON.stringify(this.activeJob) == JSON.stringify(this.editedJob)) {
          this.buttonToggle = 'p-button-success p-disabled';
        } else {
          this.buttonToggle = 'p-button-success';
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-bottom: 10px;
}

.data-container {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-bottom: 30px;
  @media screen and (max-width: 712px) {
    flex-direction: column;
  }
}
.personal-data {
  position: relative;
  border: 2px solid #618799ac;
  border-radius: 20px;
  max-width: 700px;
  margin-top: 15px;
  padding: 15px;
  border-radius: 5px;
  h2 {
    margin-bottom: 10px;
  }
  .staple {
    width: 60px;
    height: 60px;
    position: absolute;
    top: -13px;
    left: -13px;
  }
  .info-block {
    display: flex;
    b {
      margin-right: 5px;
    }
  }
}
.change-data {
  margin-top: 10px;
  margin-left: 20px;
  h2 {
    text-align: center;
  }
  .data-forms {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;
    @media screen and (max-width: 399px) {
      flex-direction: column;
    }
  }
  .save-btn {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    align-content: center;
    align-items: center;
    .filter-checkbox {
      margin-right: 10px;
    }
  }
}
.filter-checkbox {
  display: flex;
  p {
    margin-left: 10px;
  }
}
.input {
  margin: 5px;
}
.error {
  color: red;
  font-style: italic;
}
</style>
