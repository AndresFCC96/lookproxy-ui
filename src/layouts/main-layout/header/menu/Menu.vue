<template>
  <!--begin::Menu wrapper-->
  <div
    class="app-header-menu app-header-mobile-drawer align-items-stretch"
    data-kt-drawer="true"
    data-kt-drawer-name="app-header-menu"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="225px"
    data-kt-drawer-direction="end"
    data-kt-drawer-toggle="#kt_app_header_menu_toggle"
    data-kt-swapper="true"
    data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
    data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
  >
    <table>
      <tr>
        <td>
          <img
            class="h-50px app-sidebar-logo-default center"
            :src="getAssetPath(logoAccount)"
            alt=""
          />
        </td>
        <tr>
          <td></td>
        </tr>
        <td class="px-4">
          <span class="badge badge-light">
            <h5>{{ nameAccount }}</h5>
          </span>
        </td>
      </tr>
    </table>
  </div>
  <div
    v-if="headerMenuDisplay"
    class="app-header-menu app-header-mobile-drawer align-items-stretch"
    data-kt-drawer="true"
    data-kt-drawer-name="app-header-menu"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="225px"
    data-kt-drawer-direction="end"
    data-kt-drawer-toggle="#kt_app_header_menu_toggle"
    data-kt-swapper="true"
    data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
    data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
  >
    <!--begin::Menu-->
    <div
      class="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0"
      id="kt_app_header_menu"
      data-kt-menu="true"
    >
      <!-- <KTMenuPages></KTMenuPages> -->

      <div
        data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
        data-kt-menu-placement="bottom-start"
        class="menu-item menu-lg-down-accordion menu-sub-lg-down-indention me-0 me-lg-2"
      >
        <!--begin:Menu link-->
        <!-- <span class="menu-link">
          <span class="menu-title">Help</span>
          <span class="menu-arrow d-lg-none"></span>
        </span> -->
        <!--end:Menu link-->
        <!--begin:Menu sub-->
        <div
          class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown px-lg-2 py-lg-4 w-lg-200px"
        >
          <!--begin:Menu item-->
          <div class="menu-item">
            <!--begin:Menu link-->
            <a
              class="menu-link"
              href="https://preview.keenthemes.com/metronic8/vue/docs/#/utilities"
              title="Check out over 200 in-house components, plugins and ready for use solutions"
              data-bs-toggle="tooltip"
              data-bs-trigger="hover"
              data-bs-dismiss="click"
              data-bs-placement="right"
            >
              <span class="menu-icon">
                <KTIcon icon-name="rocket" icon-class="fs-3" />
              </span>
              <span class="menu-title">Components</span>
            </a>
            <!--end:Menu link-->
          </div>
          <!--end:Menu item-->
          <!--begin:Menu item-->
          <div class="menu-item">
            <!--begin:Menu link-->
            <a
              class="menu-link"
              href="https://preview.keenthemes.com/metronic8/vue/docs/#/doc-overview"
              title="Check out the complete documentation"
              data-bs-toggle="tooltip"
              data-bs-trigger="hover"
              data-bs-dismiss="click"
              data-bs-placement="right"
            >
              <span class="menu-icon">
                <KTIcon icon-name="abstract-26" icon-class="fs-3" />
              </span>
              <span class="menu-title">Documentation</span>
            </a>
            <!--end:Menu link-->
          </div>
          <!--end:Menu item-->
          <!--begin:Menu item-->
          <div class="menu-item">
            <!--begin:Menu link-->
            <a
              class="menu-link"
              href="https://preview.keenthemes.com/metronic8/vue/docs/#/changelog"
            >
              <span class="menu-icon">
                <KTIcon icon-name="code" icon-class="fs-3" />
              </span>
              <span class="menu-title">Changelog v{{ version }}</span>
            </a>
            <!--end:Menu link-->
          </div>
          <!--end:Menu item-->
        </div>
        <!--end:Menu sub-->
      </div>
      <!--end:Menu item-->
    </div>
    <!--end::Menu-->
  </div>
  <div v-else class="align-items-stretch"></div>
  <!--end::Menu wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import KTMenuPages from "@/layouts/main-layout/header/menu/MenuPages.vue";
import { version } from "@/core/helpers/documentation";
import { headerMenuDisplay } from "@/core/helpers/config";

let logoAccount = ''
let nameAccount = ''
if (localStorage.idAcount != 0) {
  logoAccount = localStorage.logoAccount
  nameAccount = localStorage.nameAccount
}

export default defineComponent({
  data() {
    return {
      logoAccount: logoAccount,
      nameAccount: nameAccount
    }
  },
  name: "header-menu",
  components: {
    KTMenuPages,
  },
  setup() {
    return {
      version,
      headerMenuDisplay,
      getAssetPath,
    };
  },
});
</script>
