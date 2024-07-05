export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "Tablero",
        route: "/dashboard",
        bootstrapIcon: "bi-speedometer2",
      },
      {
        heading: "Auditoría",
        route: "/auditory",
        bootstrapIcon: "bi-key",
      },
      {
        sectionTitle : "Consultas",
        route : '/consultas',
        bootstrapIcon : 'bi-funnel',
        sub : [
          {
            heading : 'Listado',
            route : '/querylist'
          },
          {
            heading : 'Generador EZProxy',
            route : '/querybuilder'
          },
          {
            heading : 'Generador Koha',
            route : '/koha'
          },
          {
            heading : 'Generador DSpace',
            route : '/dspace'
          },
          {
            heading: 'Programaciones',
            route: '/programaciones'
          }
        ]
      },
      {
        heading : 'Detalle Recursos',
        route : '/detailResources',
        bootstrapIcon : 'bi-bookmark-fill'
      },
      {
        heading : 'Financiero',
        route : '/financial',
        bootstrapIcon : 'bi-currency-dollar'
      },
      {
        heading : 'Nube de Palabras',
        route : '/wordCloud',
        bootstrapIcon : 'bi-cloud-fill'
      },
      {
        sectionTitle : 'Tiempo Real',
        route : '/real',
        bootstrapIcon : 'bi-clock',
        sub : [
          {
            heading : 'Mapa',
            route : '/mapa'
          },
          {
            heading : 'Actividad',
            route : '/actividad'
          }
        ]
      }
    ],
  },
  {
    heading : 'ADMINISTRACIÓN',
    route : '/admin',
    pages : [
      {
        sectionTitle : 'Usuarios Biblioteca',
        route : '/usuarios-biblioteca',
        bootstrapIcon : 'bi-people',
        sub : [
          {
            heading : 'Buscar',
            route : '/users-view-library'
          },
          {
            heading : 'Agregar Nuevo',
            route : '/nuevo-usuario'
          },
          {
            heading : 'Importar',
            route : '/importar-usuarios'
          },
          {
            heading : 'Resumen Usuarios',
            route : '/usersReport',
            bootstrapIcon : 'bi-person'
          }
        ]
      },
      {
        sectionTitle : 'Administradores',
        route : '/administrators',
        bootstrapIcon : 'bi-shield-lock',
        sub : [
          {
            heading : 'Listado',
            route : '/users-administrators'
          },
          {
            heading : 'Agregar nuevo',
            route : '/agregar-admin'
          }
        ]
      },
      {
        sectionTitle : 'Bases de Datos',
        route : '/admin-databases',
        bootstrapIcon : 'bi bi-journals',
        sub : [
          {
            heading : 'Listado',
            route : '/databases'
          },
          {
            heading : 'Agregar Nueva',
            route : '/nueva-database'
          }
        ]
      }
    ]
  },
];

export default MainMenuConfig;
