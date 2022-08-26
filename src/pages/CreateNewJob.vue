<template>
  <h1>Создать нового сотрудника</h1>
  <div class="data-container">
    <div class="form-labels">
      <div class="container-name-role">
        <div class="container name">
          <p class="error" v-if="errors.nameError">{{ errors.nameError }}</p>
          <b>Введите имя:</b>
          <prime-InputText v-model="newJob.name" type="text" />
        </div>
        <div class="container role">
          <p class="error" v-if="errors.roleError">{{ errors.roleError }}</p>
          <b>Выберите специальность:</b>
          <job-select
            :placeholder="'Профессия не выбрана'"
            :modelValue="newJob.role"
            v-model="newJob.role"
            :options="$store.getters.roleOptionsForCreate"
          ></job-select>
        </div>
      </div>

      <div class="container-birth-phone">
        <div class="container birthday">
          <p class="error" v-if="errors.birthdayError">
            {{ errors.birthdayError }}
          </p>
          <b>Когда день рождения?</b>
          <prime-InputMask
            v-model="newJob.birthday"
            mask="99.99.9999"
            slotChar="mm.dd.yyyy"
          />
        </div>

        <div class="container phone">
          <p class="error" v-if="errors.phoneError">{{ errors.phoneError }}</p>
          <b>Номер телефона:</b>
          <prime-InputMask v-model="newJob.phone" mask="+7 (999) 999-9999" />
        </div>
      </div>
    </div>

    <div class="save-btn">
      <div class="container filter-checkbox">
        <prime-checkbox v-model="newJob.isArchive" :binary="true" />
        <p>В архиве?</p>
      </div>
      <prime-button
        label="СОХРАНИТЬ"
        class="p-button-success"
        @click="createJob"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newJob: {
        id: this.$store.getters.getNewId,
        name: 'Иван Иванов',
        isArchive: false,
        role: 'waiter',
        phone: '',
        birthday: '',
      },
      errors: {
        nameError: '',
        phoneError: '',
        birthdayError: '',
        roleError: '',
      },
    };
  },
  methods: {
    checkFields() {
      const job = this.newJob;
      const errors = this.errors;
      let haveErrors = false;

      if (!job.name || job.name.length < 2) {
        errors.nameError = 'Пожалуйста, введите имя и фамилию в это поле';
        haveErrors = true;
      } else {
        errors.nameError = '';
      }

      if (!job.role) {
        errors.roleError = 'Пожалуйста, выберите профессию';
        haveErrors = true;
      } else {
        errors.roleError = '';
      }

      if (!job.phone) {
        errors.phoneError = 'Пожалуйста, заполните полностью поле телефон';
        haveErrors = true;
      } else {
        errors.phoneError = '';
      }

      if (!job.birthday) {
        errors.birthdayError =
          'Пожалуйста, заполните полностью поле день рождения';
        haveErrors = true;
      } else {
        errors.birthdayError = '';
      }
      console.info('Проверка на верность заполнения данных: ', {
        haveErrors: haveErrors,
        errors: this.errors,
      });

      return haveErrors;
    },
    createJob() {
      if (this.checkFields()) {
        return;
      }
      this.$store.commit('addNew', this.newJob);
      console.trace('Добавлен новый сотрудник: ', { newJob: this.newJob });
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-bottom: 15px;
}

.info-block {
  display: flex;
  b {
    margin-right: 5px;
  }
}
.data-container {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
  .container {
    display: flex;
    flex-direction: column;
    margin: 5px;
  }
  .filter-checkbox {
    flex-direction: row;
    p {
      margin-left: 10px;
    }
  }
  .save-btn {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    margin-top: 20px;
    .p-button-success {
      margin-left: 10px;
    }
  }
  .form-labels {
    display: flex;
    .container-name-role {
      display: flex;
      @media screen and (max-width: 839px) {
        flex-direction: column;
      }
    }
    .container-birth-phone {
      display: flex;
      @media screen and (max-width: 839px) {
        flex-direction: column;
      }
    }
    @media screen and (max-width: 414px) {
      flex-direction: column;
    }
  }
  .error {
    color: red;
    font-style: italic;
  }
}
.create-data {
  margin-top: 10px;
}
</style>
