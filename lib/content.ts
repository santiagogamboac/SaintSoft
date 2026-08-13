// Contenido comercial centralizado — brief "SaintSoft + JUMOCOL + Caso real TiviPlay" v1.0 (2026-08-12)
// Editar aquí para actualizar textos de Productos, Caso de estudio, Modelo de implementación,
// Sectores, Diferenciadores y Alianza empresarial sin tocar el JSX de cada sección.

export type ProductStatus = "pilot" | "available" | "modular" | "consulting";

export interface Product {
  id: string;
  interestValue: string;
  status: ProductStatus;
  statusLabel: string;
  title: string;
  shortDescription: string;
  problem?: string;
  capabilities: string[];
  idealFor: string[];
  cta: string;
}

export const products: Product[] = [
  {
    id: "crm-operacional",
    interestValue: "CRM Operacional para Servicios Recurrentes",
    status: "pilot",
    statusLabel: "Disponible para pilotos",
    title: "CRM Operacional para Servicios Recurrentes",
    shortDescription:
      "Plataforma para administrar clientes, ventas, pagos, activaciones, vencimientos, renovaciones, soporte y conciliación desde una operación centralizada.",
    problem:
      "Empresas que administran clientes recurrentes suelen distribuir su operación entre hojas de cálculo, WhatsApp, sistemas de pago y plataformas técnicas independientes. Esta fragmentación reduce la trazabilidad y dificulta conocer el estado real de cada cliente.",
    capabilities: [
      "Registro centralizado de clientes, contratos y planes.",
      "Gestión de prospectos, ventas, activaciones y reactivaciones.",
      "Programación de vencimientos y próximas acciones.",
      "Registro y validación de pagos.",
      "Control de renovaciones, cartera y recuperación.",
      "Gestión de soporte e incidencias.",
      "Conciliación entre pago, activación y continuidad del servicio.",
      "Historial de acciones, responsables y evidencias.",
      "Indicadores gerenciales de recaudo, conversión, productividad y diferencias.",
      "Automatizaciones e integraciones según el alcance contratado.",
    ],
    idealFor: [
      "Empresas de servicios por suscripción.",
      "Call centers de renovación o cobranza.",
      "Operadores de servicios digitales recurrentes.",
      "Pymes con cientos de gestiones mensuales realizadas mediante hojas de cálculo y mensajería.",
    ],
    cta: "Solicitar diagnóstico operacional",
  },
  {
    id: "kit-presencia-digital",
    interestValue: "Kit de Presencia Digital y Ventas",
    status: "available",
    statusLabel: "Oferta lista para implementación",
    title: "Kit de Presencia Digital y Ventas",
    shortDescription:
      "Una solución para que emprendedores y pequeñas empresas presenten sus servicios, reciban consultas, organicen citas y faciliten pagos desde una ruta digital profesional.",
    capabilities: [
      "Landing page o sitio web empresarial.",
      "Botón y ruta de atención por WhatsApp.",
      "Formularios para capturar prospectos.",
      "Agenda online.",
      "Catálogo básico de servicios.",
      "Enlaces o integración básica de pagos.",
      "Analítica y seguimiento de conversiones.",
      "Hosting, SSL, mantenimiento y soporte según el plan.",
    ],
    idealFor: [
      "Emprendedores.",
      "Negocios locales.",
      "Profesionales independientes.",
      "Empresas que actualmente venden solo por recomendación o mensajería.",
    ],
    cta: "Digitalizar mi negocio",
  },
  {
    id: "automatizacion-comercial",
    interestValue: "Automatización Comercial y Atención",
    status: "modular",
    statusLabel: "Servicio modular, sujeto a diagnóstico",
    title: "Automatización Comercial y Atención",
    shortDescription:
      "Integramos formularios, CRM, WhatsApp, correo, agenda y agentes de IA para convertir consultas en procesos comerciales medibles.",
    capabilities: [
      "Captura y clasificación de leads.",
      "Distribución de oportunidades.",
      "Recordatorios y próximas acciones.",
      "Mensajes iniciales y respuestas automatizadas.",
      "Seguimiento comercial.",
      "Agendamiento.",
      "Integraciones mediante API o webhooks.",
      "Tableros de conversión y trazabilidad.",
    ],
    idealFor: [],
    cta: "Evaluar una automatización",
  },
  {
    id: "desarrollo-a-medida",
    interestValue: "Desarrollo de Software Empresarial a Medida",
    status: "consulting",
    statusLabel: "Servicio consultivo",
    title: "Desarrollo de Software Empresarial a Medida",
    shortDescription:
      "Diseñamos y desarrollamos aplicaciones empresariales cuando el proceso requiere una solución específica que no puede resolverse con un producto estándar.",
    problem:
      "El desarrollo comienza con diagnóstico, documentación y definición de criterios de aceptación. No se ofrece desarrollo ilimitado dentro de una mensualidad fija.",
    capabilities: [],
    idealFor: [],
    cta: "Presentar mi proyecto",
  },
];

export const generalInterestValue = "Otro / no estoy seguro";
export const contactInterestOptions = [...products.map((p) => p.interestValue), generalInterestValue];

export function contactHref(interest?: string): string {
  if (!interest) return "#contacto";
  return `/?interes=${encodeURIComponent(interest)}#contacto`;
}

export const caseStudy = {
  sectionTitle: "De una operación distribuida a un sistema operacional trazable",
  company: "JUMOCOL SAS",
  operation: "Campaña TiviPlay",
  sector: "Servicios digitales recurrentes y atención a clientes latinoamericanos",
  projectType: "Documentación operacional, CRM, recaudo, conciliación, soporte y marketing conectado con ventas",
  context:
    "TiviPlay administra una operación de servicios recurrentes que incluye ventas nuevas, activaciones, renovaciones, reactivaciones, recaudo, soporte técnico, recuperación de clientes vencidos, referidos, upgrades y servicios adicionales. La operación utilizaba una combinación de CRM propio, hojas de cálculo, WhatsApp, plataformas técnicas y procedimientos manuales. La información necesaria para atender a un cliente podía encontrarse distribuida entre diferentes fuentes.",
  problemIntro:
    "El reto no era solamente registrar contactos. Era controlar el ciclo completo:",
  problemFlow: ["Prospecto", "Venta", "Pago", "Validación", "Activación", "Vencimiento", "Renovación", "Conciliación"],
  problemConsequences: [
    "Pago recibido sin activación confirmada.",
    "Servicio activo sin pago conciliado.",
    "Fechas de vencimiento desactualizadas.",
    "Cliente registrado en una fuente pero no en otra.",
    "Dificultad para reconstruir quién ejecutó una acción.",
    "Dependencia del conocimiento individual de los operadores.",
    "Baja visibilidad gerencial sobre recaudo, vencimientos y productividad.",
  ],
  solutionLayers: [
    {
      title: "Documentación operacional",
      items: [
        "Definición de roles y responsabilidades.",
        "Manuales de facturación y Back Office.",
        "Reglas para ventas, pagos, activaciones, vencimientos y renovaciones.",
        "Matrices de errores críticos.",
        "Checklists diarios, semanales y mensuales.",
      ],
    },
    {
      title: "Sistema de control",
      items: [
        "Base central de clientes.",
        "Estados operativos definidos.",
        "Fechas de último pago, vencimiento y próximo pago.",
        "Registro de planes, servicios y responsables.",
        "Control de pagos, activaciones e incidencias.",
      ],
    },
    {
      title: "Conciliación y auditoría",
      items: [
        "Cruce entre pagos recibidos, registros operativos y plataforma de servicio.",
        "Identificación de pagos pendientes de activación.",
        "Identificación de servicios sin pago relacionado.",
        "Detección de diferencias de fechas y estados.",
        "Registro de incidencias, responsables y acciones correctivas.",
      ],
    },
    {
      title: "Motor comercial",
      items: [
        "Campañas de adquisición.",
        "Reactivación de clientes.",
        "Renovaciones y referidos.",
        "Activos para Meta, Google, TikTok y WhatsApp.",
        "Registro de conversaciones, ventas y recaudo atribuible.",
        "Conexión progresiva entre marketing, CRM y operación.",
      ],
    },
  ],
  results: [
    "Un sistema documental denominado TIVIPLAY_OPERATION_SYSTEM — TOPS.",
    "Procesos formales para facturación, recaudo, activación, conciliación y cierre.",
    "Una separación entre operación diaria, Back Office y dirección gerencial.",
    "Criterios de control para pagos, servicio, vencimientos e incidencias.",
    "Una ruta de migración progresiva desde hojas de cálculo hacia CRM.",
    "Indicadores operativos y criterios de auditoría.",
    "Un modelo comercial multicanal conectado con seguimiento y recaudo.",
  ],
  closing:
    "El caso TiviPlay demuestra la metodología de SaintSoft: comprender primero la operación, documentar sus reglas, construir controles y posteriormente convertir el conocimiento validado en software y automatización.",
  cta: "Quiero organizar una operación similar",
};

export interface ImplementationStage {
  number: string;
  title: string;
  objective: string;
  activities: string[];
  deliverable: string;
}

export const implementationStages: ImplementationStage[] = [
  {
    number: "01",
    title: "Diagnóstico empresarial",
    objective: "Comprender el problema, la operación actual y el resultado esperado.",
    activities: [
      "Reunión de descubrimiento.",
      "Mapa de procesos, actores y herramientas.",
      "Identificación de fuentes de información.",
      "Priorización de problemas y riesgos.",
    ],
    deliverable: "Diagnóstico y alcance preliminar.",
  },
  {
    number: "02",
    title: "Diseño funcional",
    objective: "Convertir la operación en reglas y requerimientos verificables.",
    activities: [
      "Flujos operativos.",
      "Estados y reglas de negocio.",
      "Roles y permisos.",
      "Datos requeridos.",
      "Criterios de aceptación.",
    ],
    deliverable: "Diseño funcional y plan de implementación.",
  },
  {
    number: "03",
    title: "Configuración o desarrollo",
    objective: "Construir o adaptar la solución aprobada.",
    activities: [
      "Configuración de módulos.",
      "Desarrollo de funciones acordadas.",
      "Integraciones.",
      "Pruebas técnicas.",
      "Preparación de respaldos y ambientes.",
    ],
    deliverable: "Versión lista para validación.",
  },
  {
    number: "04",
    title: "Migración y piloto",
    objective: "Probar la solución con información controlada y usuarios reales.",
    activities: [
      "Limpieza y carga de datos autorizados.",
      "Capacitación inicial.",
      "Ejecución de casos de prueba.",
      "Corrección de incidencias críticas.",
    ],
    deliverable: "Piloto validado.",
  },
  {
    number: "05",
    title: "Salida en vivo",
    objective: "Incorporar la solución a la operación cotidiana.",
    activities: [
      "Activación del ambiente productivo.",
      "Acompañamiento de adopción.",
      "Monitoreo inicial.",
      "Protocolo de soporte.",
    ],
    deliverable: "Solución operativa.",
  },
  {
    number: "06",
    title: "Medición y evolución",
    objective: "Mejorar el producto a partir del uso real.",
    activities: [
      "Revisión de indicadores.",
      "Priorización del backlog.",
      "Mantenimiento.",
      "Actualizaciones.",
      "Automatizaciones adicionales.",
    ],
    deliverable: "Plan continuo de evolución.",
  },
];

export interface Sector {
  title: string;
  verifiedExperience: string;
  capabilities: string[];
}

export const sectors: Sector[] = [
  {
    title: "Servicios digitales recurrentes",
    verifiedExperience: "TiviPlay / JUMOCOL SAS",
    capabilities: [
      "Clientes recurrentes.",
      "Activaciones y vencimientos.",
      "Renovaciones y reactivaciones.",
      "Soporte.",
      "Referidos y servicios adicionales.",
    ],
  },
  {
    title: "Call centers y operaciones de recaudo",
    verifiedExperience: "Operación comercial y de Back Office de JUMOCOL",
    capabilities: [
      "Gestión por asesores.",
      "Seguimiento de pagos.",
      "Próximas acciones.",
      "Conciliación.",
      "Control de productividad.",
      "Auditoría de ejecución.",
    ],
  },
  {
    title: "Operaciones por suscripción",
    verifiedExperience: "Modelo recurrente aplicado en TiviPlay",
    capabilities: [
      "Fechas de próximo pago.",
      "Renovaciones.",
      "Cartera.",
      "Permanencia.",
      "Recuperación de clientes.",
      "Continuidad del servicio.",
    ],
  },
  {
    title: "Emprendedores y negocios locales",
    verifiedExperience: "Kit de Presencia Digital y Ventas",
    capabilities: [
      "Página web.",
      "Atención por WhatsApp.",
      "Formularios.",
      "Agendamiento.",
      "Pagos.",
      "Seguimiento de prospectos.",
    ],
  },
];

export const differentiators = {
  sectionTitle: "Más que desarrollar software, construimos sistemas operacionales",
  comparison: [
    { agency: "Recibe una lista de funciones.", saintsoft: "Estudia el proceso, el riesgo y el resultado empresarial." },
    { agency: "Entrega un proyecto tecnológico.", saintsoft: "Implementa una solución con adopción, control y evolución." },
    { agency: "Mide tareas y horas de desarrollo.", saintsoft: "Define indicadores operativos y criterios de aceptación." },
    { agency: "Cada proyecto comienza desde cero.", saintsoft: "Reutiliza componentes y conocimiento validado." },
    { agency: "El conocimiento queda en personas.", saintsoft: "Convierte la experiencia en procesos, documentación y software." },
    { agency: "Tecnología separada del negocio.", saintsoft: "Dirección tecnológica y dirección empresarial trabajan juntas." },
  ],
  principles: [
    {
      title: "Operaciones reales como punto de partida.",
      description: "Las soluciones se diseñan sobre problemas observados en empresas en funcionamiento.",
    },
    {
      title: "Documentación antes de automatización.",
      description: "Primero se entiende y estandariza el proceso; después se automatiza.",
    },
    {
      title: "Producto antes que proyecto.",
      description: "Se busca construir núcleos reutilizables y configurables.",
    },
    {
      title: "Trazabilidad por defecto.",
      description: "Las acciones críticas deben registrar estado, responsable, fecha y evidencia.",
    },
    {
      title: "Implementación acompañada.",
      description: "El trabajo incluye diagnóstico, configuración, piloto, capacitación y evolución.",
    },
    {
      title: "Visión empresarial y tecnológica.",
      description: "El producto se prioriza según valor comercial, viabilidad técnica y rentabilidad.",
    },
  ],
};

export const partnership = {
  sectionTitle: "Alianza empresarial SaintSoft + JUMOCOL",
  intro:
    "SaintSoft desarrolla sus soluciones con una visión que integra tecnología y operación empresarial. JUMOCOL SAS participa como aliado operacional y cliente cero, aportando experiencia en procesos comerciales, atención al cliente, recaudo recurrente, Back Office, conciliación, control gerencial y marketing orientado a ventas.",
  outro:
    "Esta relación permite validar las soluciones dentro de una operación real antes de convertirlas en productos para otras empresas.",
  jumocolContributions: [
    "Arquitectura de procesos empresariales.",
    "Operación de call center.",
    "Gestión comercial y servicio al cliente.",
    "Facturación y recaudo recurrente.",
    "Back Office y conciliación.",
    "Indicadores y gobernanza.",
    "Caso real para pruebas y validación.",
    "Dirección de producto y priorización comercial.",
    "Marketing multicanal conectado con ventas y CRM.",
  ],
  saintsoftContributions: [
    "Arquitectura de software.",
    "Desarrollo del CRM.",
    "Aplicaciones web.",
    "Infraestructura y despliegue.",
    "Seguridad y respaldos.",
    "Integraciones.",
    "Automatización.",
    "Mantenimiento y evolución técnica.",
  ],
};
