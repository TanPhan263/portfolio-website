export type StackBrand = { name: string; color: string; darkColor: string };

export type ProjectTimelineItem = {
  year: string;
  title: string;
  summary: string;
  description: string;
  stacks: StackBrand[];
  achievements: string[];
};

const BRAND_COLORS: Record<string, StackBrand> = {
  // Core
  JavaScript: { name: 'JavaScript', color: '#F7DF1E', darkColor: '#D4B800' },
  TypeScript: { name: 'TypeScript', color: '#3178C6', darkColor: '#255FA6' },
  HTML5: { name: 'HTML5', color: '#E34F26', darkColor: '#B33618' },
  CSS: { name: 'CSS', color: '#1572B6', darkColor: '#0F5A94' },
  SASS: { name: 'SASS', color: '#CC6699', darkColor: '#A84E7D' },

  // Frameworks & Libraries
  ReactJS: { name: 'ReactJS', color: '#61DAFB', darkColor: '#21A1F1' },
  Nextjs: { name: 'Next.js', color: '#000000', darkColor: '#FFFFFF' },
  Vuejs: { name: 'Vue.js', color: '#42B883', darkColor: '#2C9D6F' },
  Nuxtjs: { name: 'Nuxt.js', color: '#00C58E', darkColor: '#108775' },
  Redux: { name: 'Redux', color: '#764ABC', darkColor: '#5B2F96' },
  'Redux Thunk': {
    name: 'Redux Thunk',
    color: '#764ABC',
    darkColor: '#4E2C85'
  },
  'React Query': {
    name: 'React Query',
    color: '#FF4154',
    darkColor: '#E0233C'
  },
  Formik: { name: 'Formik', color: '#025E8C', darkColor: '#014866' },
  'React Hook Form': {
    name: 'React Hook Form',
    color: '#EC5990',
    darkColor: '#B93D6A'
  },
  Vuetify: { name: 'Vuetify', color: '#1867C0', darkColor: '#104B8B' },
  'Ant Design': { name: 'Ant Design', color: '#0170FE', darkColor: '#0057C2' },
  Highcharts: { name: 'Highcharts', color: '#2B908F', darkColor: '#1A6B69' },
  Mantine: { name: 'Mantine UI', color: '#339AF0', darkColor: '#1971C2' },
  ECharts: { name: 'ECharts', color: '#E63231', darkColor: '#C1272D' },
  AgGrid: { name: 'Ag-Grid', color: '#00A845', darkColor: '#0B7739' },
  GSAP: { name: 'GSAP', color: '#88CE02', darkColor: '#6BA802' },

  // Styling & UI
  TailwindCSS: { name: 'TailwindCSS', color: '#38BDF8', darkColor: '#0EA5E9' },
  Bootstrap: { name: 'Bootstrap', color: '#7952B3', darkColor: '#5A3E8C' },
  MaterialUI: { name: 'Material UI', color: '#007FFF', darkColor: '#0059B2' },

  // Backend / API
  GraphQL: { name: 'GraphQL', color: '#E10098', darkColor: '#B50077' },
  PHP: { name: 'PHP', color: '#777BB4', darkColor: '#545C94' },
  RestAPI: { name: 'Rest API', color: '#6E6E6E', darkColor: '#4A4A4A' },
  'Google Map API': {
    name: 'Google Map API',
    color: '#34A853',
    darkColor: '#1E7033'
  },
  Vendure: { name: 'Vendure.io', color: '#00828C', darkColor: '#026066' },

  // Tools & Workflow
  GitLab: { name: 'GitLab', color: '#FC6D26', darkColor: '#E24329' },
  BitBucket: { name: 'BitBucket', color: '#0052CC', darkColor: '#0747A6' },
  Agile: { name: 'Agile', color: '#FF6F00', darkColor: '#E65100' },
  Scrum: { name: 'Scrum', color: '#29BEB0', darkColor: '#1D9085' },
  Atomic: { name: 'Atomic Design', color: '#5C6BC0', darkColor: '#3949AB' },
  BEM: { name: 'BEM', color: '#00B5AD', darkColor: '#008B83' }
};

// Helper: chuyển list tên stack → list {name,color,darkColor}
const stacks = (...names: string[]): StackBrand[] =>
  names.map(
    (n) =>
      BRAND_COLORS[n] ?? { name: n, color: '#94A3B8', darkColor: '#64748B' }
  );

export const PROJECT_TIMELINE: ProjectTimelineItem[] = [
  {
    year: 'Late 2020',
    title: 'Sport Management Dashboard – Internship',
    summary:
      'First internship project, worked on a sport app management website, collaborating with backend and design teams.',
    description:
      'Implemented UI features, collaborated with team to deliver tasks, and learned how to apply frontend fundamentals in real-world projects.',
    stacks: stacks(
      'Vue.js',
      'JavaScript',
      'MaterialUI',
      'Google Map API',
      'RestAPI',
      'GitLab'
    ),
    achievements: [
      'Adapted quickly to real project workflow',
      'Built UI features based on design team input',
      'Collaborated with backend team to complete modules'
    ]
  },
  {
    year: 'Start 2021',
    title: 'Real-Estate Website – bdsvinh.com.vn',
    summary:
      'A real estate platform providing listings, payments, and post management.',
    description:
      'Developed storefront and admin features, integrated payments, and optimized SEO performance for end-users.',
    stacks: stacks(
      'Vue.js',
      'Nuxt.js',
      'JavaScript',
      'Vuetify',
      'TailwindCSS',
      'RestAPI',
      'Cloudinary'
    ),
    achievements: [
      'Delivered admin and storefront features',
      'Implemented SEO and online payment integration',
      'Created reusable components using Atomic design'
    ]
  },
  {
    year: 'Late 2021',
    title: 'Mipart – Ecommerce Website',
    summary:
      'Developed a customizable eCommerce website for component ordering with real-time pricing and back-office management.',
    description:
      'Built both storefront and back-office systems, created UI library with Storybook, and ensured smooth cross-device experiences.',
    stacks: stacks(
      'Vue.js',
      'Nuxt.js',
      'TypeScript',
      'TailwindCSS',
      'GSAP',
      'GraphQL',
      'Vendure.io',
      'Agile/Scrum'
    ),
    achievements: [
      'Success developed UI library with Storybook & Buefy',
      'Built customizable product configuration',
      'Improved performance and UX with animations',
      'Collaborated with cross-functional team to deliver UI assets'
    ]
  },
  {
    year: '2022',
    title: 'QR Code Generator Website - QR TIGER',
    summary:
      'A QR code generator website that allows users to customize QR codes and track valuable customer data.',
    description:
      'Delivered dynamic QR codes (URL, files, vCards, multi-URL,...), improved codebase, and ensured cross-browser compatibility.',
    stacks: stacks(
      'Next.js',
      'JavaScript',
      'React Query',
      'HTML5',
      'SASS',
      'Bootstrap',
      'Formik',
      'RestAPI',
      'Google Map API'
    ),
    achievements: [
      'Migrated and refactored old codebase',
      'Implemented dynamic QR code generation',
      'Collaborated with teams to identify and prioritize features'
    ]
  },
  {
    year: '2023',
    title: 'Japanese Waste Management System',
    summary:
      'Enhanced legacy Japanese Waste Management system, migrating from bizDesigner to modern ReactJS frontend.',
    description:
      'Rebuilt UI with ReactJS while keeping core business logic intact. Focused on reusable components and scalable architecture.',
    stacks: stacks(
      'React.js',
      'TypeScript',
      'Redux',
      'Redux Thunk',
      'React Hook Form',
      'SASS',
      'PHP'
    ),
    achievements: [
      'Collaborated with clients for requirement analysis',
      'Created reusable components and custom hooks',
      'Improved maintainability and team productivity'
    ]
  }
];
