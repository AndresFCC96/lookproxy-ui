import * as am5 from '@amcharts/amcharts5';

const StateUsers = [{
    title: "Activos",
    value: 112,
    sliceSettings : {
        fill: am5.color(0x50cd89),
        stroke: am5.color(0x50cd89)
    }
    }, {
    title: "Inactivos",
    value: 32,
    sliceSettings: {
        fill: am5.color(0xf1416c),
        stroke: am5.color(0xf1416c)
    }
    }
];

const AnonymousUsers = [
    {
        month: "Ene",
        value: 50
    },
    {
        month: "Feb",
        value: 95
    },
    {
        month: "Mar",
        value: 99
    },
    {
        month: "Abr",
        value: 102
    },
    {
        month: "May",
        value: 65
    },
    {
        month: "Jun",
        value: 44
    },
    {
        month: "Jul",
        value: 98
    },
    {
        month: "Ago",
        value: 75
    },
    {
        month: "Sep",
        value: 69
    },
    {
        month: "Oct",
        value: 46
    },
    {
        month: "Nov",
        value: 51
    },
    {
        month: "Dic",
        value: 39
    },
];

const userOptions = [
    {label : 'Todos', value : 0},
    {label : 'Activos', value : 1},
    {label : 'Inactivos', value : 2}
];

const fieldsOptions = [
    {label : "Facultad", value : 0},
    {label : "Programa", value : 1},
    {label : "Tipo de Usuario", value : 2},
    {label : "Modalidad", value : 3},
    {label : "Serie", value : 4},
];

const userByFaculty = [
    {field : "FAC. C. ECON. ADMIN Y CONTABLES", value : 9374},
    {field : "FAC. C. SALUD", value : 8539},
    {field : "FAC. EDUCACION", value : 8172},
    {field : "FAC. INGENIERIA", value: 7416},
    {field : "FAC. C. HUMANAS Y BELLAS ARTES", value: 5876},
    {field : "FAC. C. BASICAS Y TECNOLOGIAS", value: 2950},
    {field : "FAC. C. AGROINDUSTRIALES", value: 1621},
    {field : "AREA ADMINISTRATIVA", value: 927},
    {field : "USUARIO INVESTIGADOR", value: 74}
];

const userByProgram = [
    {field : "SEGURIDAD Y SALUD EN EL TRABAJO (DISTANCIA)", value: 6195},
    {field : "CIDBA", value: 3036},
    {field : "LIC. EN LENGUAS MODERNAS CON ENFASIS EN INGLES Y FRANCES", value: 2693},
    {field : "ADMON FINANCIERA (DISTANCIA)", value: 2454},
    {field : "ADMON NEGOCIOS (DISTANCIA)", value: 1925},
    {field : "ING. CIVIL", value: 1527},
    {field : "ADMON NEGOCIOS (PRESENCIAL)", value: 1474},
    {field : "LIC. EN EDUCACION FISICA RECREACION Y DEPORTES", value: 1337},
    {field : "CONTADURIA PUBLICA (NOCTURNA)", value: 1331},
    {field : "TEC. EN OBRAS CIVILES", value: 1311},
    {field : "ING. SISTEMAS Y COMPUTACION (DIURNA)", value: 1306},
    {field : "BIOLOGIA", value: 1213},
];

export {
    StateUsers,
    AnonymousUsers,
    userOptions,
    fieldsOptions,
    userByFaculty,
    userByProgram
}