import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/Dashboard.vue"),
        meta: {
          pageTitle: "Panel Central de Visualización",
          breadcrumbs: ["Reportería"],
          middleware: "auth"
        },
      },
      {
        path : "/querybuilder",
        name : "querybuilder",
        component : () => import("@/views/querybuilder/Querybuilder.vue"),
        meta : {
          pageTitle : "Generador de Consultas EZProxy",
          breadcrumbs : ["Reportería", "Consultas EZProxy"],
          middleware: "auth"
        }
      },
      {
        path : "/auditory",
        name : "auditory",
        component : () => import("@/views/Auditory/Auditory.vue"),
        meta : {
          pageTitle : "Auditoria",
          middleware: "auth"
          //breadcrumbs : ["QueryBuilders"]
        }
      },
      {
        path : "/querylist",
        name : "querylist",
        component : () => import("@/views/pages/QueryList.vue"),
        meta : {
          pageTitle : "Listado de Consultas",
          //breadcrumbs : ["QueryBuilders"]
          middleware: "auth"
        }
      },
      {
        path : "/detailResources",
        name : "detailResources",
        component : () => import("@/views/pages/DetailResources.vue"),
        meta : {
          pageTitle : "Reporte Detallado de Recursos por Base de Datos",
          breadcrumbs : ["Detalle Recursos"],
          middleware: "auth"
        }
      },
      {
        path : "/financial",
        name : "financial",
        component : () => import("@/views/financial/Financial.vue"),
        meta : {
          pageTitle : "Reporte Financiero por Base de Datos",
          breadcrumbs : ["Reporteria", "Financiero"],
          middleware: "auth"
        }
      },
      {
        path : "/wordCloud",
        name : "wordCloud",
        component : () => import("@/views/wordCloud/WordCloud.vue"),
        meta : {
          pageTitle : "Palabras más Buscadas",
          breadcrumbs : ["Nube de Palabras"],
          middleware: "auth"
        }
      },
      {
        path : "/usersReport",
        name : "usersReport",
        component : () => import("@/views/usersReport/UsersReport.vue"),
        meta : {
          pageTitle : "Reporte de Usuarios",
          breadcrumbs : ["Reporteria"],
          middleware: "auth"
        }
      },
      {
        path : "/users-view-library",
        name : "userViewLibrary",
        component : () => import("@/views/admin/users/Library.vue"),
        meta : {
          pageTitle : "Usuarios de biblioteca",
          breadcrumbs : ["Administración"],
          middleware: "auth"
        }
      },
      {
        path : "/users-administrators",
        name : "userViewAdministrators",
        component : () => import("@/views/admin/users/Administrators.vue"),
        meta : {
          pageTitle : "Usuarios Administrativos",
          breadcrumbs : ["Administración"],
          middleware: "auth"
        }
      },
      {
        path : "/databases",
        name : "viewDatabases",
        component : () => import("@/views/admin/databases/Databases.vue"),
        meta : {
          pageTitle : "Bases de Datos",
          breadcrumbs : ["Administración"],
          middleware: "auth"
        }
      },
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Página no encontrada",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },
  {
    path: "/multi-step-sign-up",
    name: "multi-step-sign-up",
    component: () =>
      import("@/views/crafted/authentication/MultiStepSignUp.vue"),
    meta: {
      pageTitle: "Multi-step Sign up",
    },
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
