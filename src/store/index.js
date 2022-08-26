import { createStore } from 'vuex';

export default createStore({
  state: () => {
    return {
      jobs: [
        {
          id: 1,
          name: 'Илья Емельянов',
          isArchive: false,
          role: 'driver',
          phone: '+7 (883) 508-3269',
          birthday: '12.02.1982',
        },
        {
          id: 2,
          name: 'Александр Ларионов',
          isArchive: true,
          role: 'waiter',
          phone: '+7 (823) 440-3602',
          birthday: '26.01.1986',
        },
        {
          id: 3,
          name: 'Богдан Давыдов',
          isArchive: false,
          role: 'driver',
          phone: '+7 (971) 575-2645',
          birthday: '29.11.1990',
        },
        {
          id: 4,
          name: 'Олимпиада Макарова',
          isArchive: true,
          role: 'waiter',
          phone: '+7 (945) 447-2286',
          birthday: '06.01.1987',
        },
        {
          id: 5,
          name: 'Алла Котова',
          isArchive: false,
          role: 'cook',
          phone: '+7 (948) 523-2964',
          birthday: '26.01.1982',
        },
        {
          id: 6,
          name: 'Кира Колесникова',
          isArchive: true,
          role: 'cook',
          phone: '+7 (929) 592-3637',
          birthday: '25.02.1972',
        },
        {
          id: 7,
          name: 'Александр Третьяков',
          isArchive: false,
          role: 'driver',
          phone: '+7 (872) 568-2916',
          birthday: '31.05.1979',
        },
        {
          id: 8,
          name: 'Пелагея Морозова',
          isArchive: false,
          role: 'driver',
          phone: '+7 (977) 521-3479',
          birthday: '11.09.1981',
        },
        {
          id: 9,
          name: 'Агафон Громов',
          isArchive: true,
          role: 'driver',
          phone: '+7 (868) 569-3159',
          birthday: '07.06.1988',
        },
        {
          id: 10,
          name: 'Владлен Тетерин',
          isArchive: true,
          role: 'driver',
          phone: '+7 (808) 592-2480',
          birthday: '20.06.1978',
        },
        {
          id: 11,
          name: 'Валерий Пестов',
          isArchive: false,
          role: 'cook',
          phone: '+7 (899) 403-2387',
          birthday: '20.01.1987',
        },
        {
          id: 12,
          name: 'Даниил Кузнецов',
          isArchive: true,
          role: 'waiter',
          phone: '+7 (933) 582-2673',
          birthday: '25.05.1987',
        },
        {
          id: 13,
          name: 'Фёдор Веселов',
          isArchive: true,
          role: 'waiter',
          phone: '+7 (951) 517-3787',
          birthday: '16.12.1972',
        },
        {
          id: 14,
          name: 'Пантелеймон Ефимов',
          isArchive: true,
          role: 'cook',
          phone: '+7 (807) 492-3627',
          birthday: '17.04.1986',
        },
        {
          id: 15,
          name: 'Иванна Калашникова',
          isArchive: true,
          role: 'waiter',
          phone: '+7 (927) 488-2568',
          birthday: '24.03.1982',
        },
        {
          id: 16,
          name: 'Прасковья Кондратьева',
          isArchive: true,
          role: 'cook',
          phone: '+7 (875) 517-3873',
          birthday: '07.06.1983',
        },
        {
          id: 17,
          name: 'Евдокия Филиппова',
          isArchive: false,
          role: 'waiter',
          phone: '+7 (877) 450-3253',
          birthday: '03.12.1994',
        },
      ],
      selectedSort: '',
      filters: {
        role: '',
        isArchive: '',
      },
      filterOptions: {
        role: [
          {
            key: '',
            label: 'Все',
            icon: 'pi pi-fw pi-angle-right',
          },
          {
            key: 'driver',
            label: 'Водитель',
            icon: 'pi pi-fw pi-angle-right',
          },
          {
            key: 'waiter',
            label: 'Официант',
            icon: 'pi pi-fw pi-angle-right',
          },
          {
            key: 'cook',
            label: 'Повар',
            icon: 'pi pi-fw pi-angle-right',
          },
        ],
        isArchive: { true: true, noFilter: '' },
      },
      sortOptions: [
        {
          key: '',
          label: 'Все',
          icon: 'pi pi-fw pi-angle-right',
        },
        {
          key: 'name',
          label: 'По имени',
          icon: 'pi pi-fw pi-angle-right',
        },
        {
          key: 'birthday',
          label: 'По дате рождения',
          icon: 'pi pi-fw pi-angle-right',
        },
      ],
    };
  },
  getters: {
    filteredJobs: state => {
      let filteredJobs = [...state.jobs];
      if (state.filters.role) {
        filteredJobs = filteredJobs.filter(job => {
          return job.role == state.filters.role;
        });
      }
      if (state.filters.isArchive !== '') {
        filteredJobs = filteredJobs.filter(job => {
          return job.isArchive == state.filters.isArchive;
        });
      }
      return filteredJobs;
    },
    sortedAndFiltredJobs: (state, getters) => {
      const doneJobs = getters.filteredJobs;
      if (state.selectedSort == 'name') {
        doneJobs.sort((job1, job2) => {
          return job1[state.selectedSort]?.localeCompare(
            job2[state.selectedSort]
          );
        });
      } else if (state.selectedSort == 'birthday') {
        return doneJobs.sort((job1, job2) => {
          const d1 = new Date(...job1[state.selectedSort].split('.').reverse());
          const d2 = new Date(...job2[state.selectedSort].split('.').reverse());
          return d1 - d2;
        });
      }
      return doneJobs;
    },
    getActiveJob: state => id => {
      let job = {};
      Object.assign(
        job,
        state.jobs.find(el => el.id == id)
      );
      return job;
    },
    getNewId: state => {
      return state.jobs[state.jobs.length - 1].id + 1;
    },
    roleOptionsForCreate: state => {
      const roles = state.filterOptions.role;
      return roles.filter(el => {
        return el.key != roles[0].key;
      });
    },
  },
  mutations: {
    editJobs(state, editedJob) {
      const jobIndex = state.jobs
        .map(e => {
          return e.id;
        })
        .indexOf(Number(editedJob.id));

      const job = state.jobs[jobIndex];

      if (editedJob.name != job.name) {
        job.name = editedJob.name;
      }
      if (editedJob.isArchive != job.isArchive) {
        job.isArchive = editedJob.isArchive;
      }
      if (editedJob.role != job.role) {
        job.role = editedJob.role;
      }
      if (editedJob.phone != job.phone) {
        job.phone = editedJob.phone;
      }
      if (editedJob.birthday != job.birthday) {
        job.birthday = editedJob.birthday;
      }
    },
    addNew(state, newJob) {
      state.jobs.push(newJob);
    },
    updateSelectedSort(state, value) {
      state.selectedSort = value;
    },
    updateFilters(state, value) {
      state.filters = value;
    },
  },
});
