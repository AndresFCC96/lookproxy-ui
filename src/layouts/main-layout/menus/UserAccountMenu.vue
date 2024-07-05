<template>
  <!--begin::Menu-->
  <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold py-4 fs-6 w-275px"
    data-kt-menu="true">
  
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <!--begin::Avatar-->
        <div class="symbol symbol-50px me-5">
          <img alt="Logo" :src="getAssetPath('media/avatars/300-3.jpg')" />
        </div>
        <!--end::Avatar-->

        <!--begin::Username-->
        <div class="d-flex flex-column">
          <div class="fw-bold d-flex align-items-center fs-5">
            {{ user.first_name+" "+user.last_name }}
          </div>
          <span v-if="user.is_staff" class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2"
            >Administrador</span>
          <span v-if="user.is_superuser" class="badge badge-light-danger fw-bold fs-8 px-2 py-1 ms-2"
          >Super User</span>
          <a href="#" class="fw-semobold text-muted text-hover-primary fs-7"
            >{{ user.email }}</a
          >
        </div>
        <!--end::Username-->
      </div>
    </div>

    <div class="separator my-2"></div>

    <div
      class="menu-item px-5"
      data-kt-menu-trigger="hover"
      data-kt-menu-placement="left-start"
      data-kt-menu-flip="center, top"
      v-if="showAccounts"
    >
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        <span class="menu-title">Universidades</span>
        <span class="menu-arrow"></span>
      </router-link>

      <div class="menu-sub menu-sub-dropdown w-175px py-4">
        <div class="menu-item px-3" v-for="account in accounts">
          <a href="#" v-on:click="changeAccount(account.id, account.name, account.datasetId, account.tableId, account.imgLogo)" class="menu-link px-5">
            {{ account.name }}
          </a>
        </div>
      </div>
    </div>

    <div class="menu-item px-5">
      <a @click="signOut()" class="menu-link px-5"> Sign Out / Salir</a>
    </div>
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";

interface Account {
  id: number,
  name: string,
  datasetId: string,
  tableId: string,
  imgLogo: string
}
const accounts = ref([] as Account[])

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  data() {
    return {
      showAccounts: true,
      accounts
    }
  },
  methods: {
    changeAccount(id :number, name :string, datasetId :string, tableId :string, imgLogo :string) {
      let img = `media/logos/${imgLogo}.png`
      localStorage.idAccount = id
      localStorage.nameAccount = name
      localStorage.logoAccount = img
      localStorage.schema = datasetId
      localStorage.table = tableId
      // location.reload()
    },
    getAccounts() {
      const payload = {
          "fields" : ["*"],
          "filters" : []
      }

      ApiService.post("api/accounts/filter", payload)
      .then(({ data }) => {
        accounts.value = data
      })
      .catch(({ response }) => {
        console.log(response)
      });
    }
  },
  setup() {
    const router = useRouter();
    const i18n = useI18n();
    const store = useAuthStore();
		const user = store.user;

    i18n.locale.value = localStorage.getItem("lang")
      ? (localStorage.getItem("lang") as string)
      : "en";

    const countries = {
      en: {
        flag: getAssetPath("media/flags/united-states.svg"),
        name: "English",
      },
      es: {
        flag: getAssetPath("media/flags/spain.svg"),
        name: "Spanish",
      },
      de: {
        flag: getAssetPath("media/flags/germany.svg"),
        name: "German",
      },
      ja: {
        flag: getAssetPath("media/flags/japan.svg"),
        name: "Japanese",
      },
      fr: {
        flag: getAssetPath("media/flags/france.svg"),
        name: "French",
      },
    };

    const signOut = () => {
      store.logout();
      router.push({ name: "sign-in" });
    };

    const setLang = (lang: string) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
    };

    const currentLanguage = computed(() => {
      return i18n.locale.value;
    });

    const currentLangugeLocale = computed(() => {
      return countries[i18n.locale.value as keyof typeof countries];
    });

    return {
      signOut,
      setLang,
      currentLanguage,
      currentLangugeLocale,
      countries,
      getAssetPath,
      user
    };
  },
  mounted() {
    this.getAccounts()
    this.showAccounts = (this.user.is_superuser) ? true : false
  }
});
</script>
