const optionsBD = [
    { label : "Ebooks 7-24", value : 1 },
    { label : "Koha", value : 2 }
];

const optionsDate = [
    {label : 'Relativa', value :0},
    {label : 'Especifica', value :1},
];

const optionsRelativeDate = [
    {label : 'Año antepasado', id : 0},
    {label : 'Año pasado', id : 1},
    {label : 'Este Año', id : 2},
    {label : 'Semestre Pasado', id : 3},
    {label : 'Este Semestre', id : 4},
    {label : 'Trimestre Pasado', id : 5},
    {label : 'Este Trimestre', id : 6},
    {label : 'Mes Antepasado', id : 7},
    {label : 'Mes pasado', id : 8},
    {label : 'Este Mes', id : 9},
    {label : 'Semana Antepasada', id : 10},
    {label : 'Semana Pasada', id : 11},
    {label : 'Esta Semana', id : 12},
    {label : 'Hoy', id : 13}
];

const totalData = {
    users : 468,
    itemConsult : 198,
    itemRead : 189,
    sessions : 858,
    consults : 1813,
    reads : 1303
}

const optionsSegment = [
    {label : 'Título', value : 0},
    {label : 'Tema', value : 1},
    {label : 'Editorial', value : 2},
    {label : 'Autor', value : 3},
    {label : 'Año de Publicación', value : 4},
];

const optionsIndicator = [
    {label : 'Consultas', value : 0},
    {label : 'Lecturas', value : 1},
    {label : 'Usuarios', value : 2},
    {label : 'Sesiones', value : 3},
    {label : 'Item Consultados', value : 4},
    {label : 'Item Leídos', value : 5},
];

const tableBooks = [
    {name : 'Aprender a aprender. Hábitos, métodos, estrategias y técnicas de estudio	', value : 104},
    {name : 'Administración de recursos humanos	', value : 40},
    {name : 'Matemática: Razonamiento y aplicaciones	', value : 38},
    {name : 'Matemáticas financieras aplicadas	', value : 33},
    {name : 'Negocios internacionales	', value : 32},
    {name : 'Análisis financiero. Enfoque y proyecciones - SIL	', value : 30},
    {name : 'Innovación Empresarial	', value : 26},
    {name : 'Matemáticas para administración y economía	', value : 25},
    {name : 'Información financiera de los negocios	', value : 19},
    {name : 'Estadística aplicada a los negocios y la economía	', value : 18},
];

const dataGraphic = [
    {name : 'Aprender a aprender. Hábitos, métodos, estrategias y técnicas de estudio	', value : 250},
    {name : 'Administración de recursos humanos	', value : 40},
    {name : 'Matemática: Razonamiento y aplicaciones	', value : 38},
    {name : 'Matemáticas financieras aplicadas	', value : 33},
    {name : 'Negocios internacionales	', value : 32},
    {name : 'Otros', value : 118},
];

const detailGraphic = [
    { category : 'Administración General', open : 43, close : 46 },
    { category : 'Educación', open : 13, close : 16 },
    { category : 'Contabilidad', open : 6, close : 6 },
    { category : 'Matemáticas', open : 6, close : 6 },
    { category : 'Análisis', open : 10, close : 10 },
    { category : 'Deportes, atletismo y al aire libre', open : 5, close : 3 },
    { category : 'Derecho', open : 4, close : 3 },
    { category : 'Economía', open : 4, close : 7 },
    { category : 'Ciencias médicas, Medicina', open : 4, close : 3 },
    { category : 'Ingeniería y operaciones afines', open : 3, close : 0 }
];

export {
    optionsBD,
    optionsDate,
    optionsRelativeDate,
    totalData,
    optionsSegment,
    optionsIndicator,
    tableBooks,
    dataGraphic,
    detailGraphic
};