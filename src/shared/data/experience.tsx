export type StackBrand = { name: string; color: string; darkColor: string };

export type ProjectTimelineDetail = {
  title: string;
  summary: string;
  stacks: StackBrand[];
  achievements: string[];
  imageUrl: string;
  imageUrlMobile: string;
};

export type ProjectTimelineItem = {
  year: string;
  projects: ProjectTimelineDetail[];
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

const stacks = (...names: string[]): StackBrand[] =>
  names.map(
    (n) =>
      BRAND_COLORS[n] ?? { name: n, color: '#94A3B8', darkColor: '#64748B' }
  );

export const PROJECT_TIMELINE: ProjectTimelineItem[] = [
  {
    year: 'Start 2021',
    projects: [
      {
        title: 'Real-Estate Website – Bat Dong San Vinh',
        summary:
          'A real estate platform providing listings, payments, and post management for those who want to sell or rent their real-estate',
        stacks: stacks(
          'Nuxt.js',
          'Vuejs',
          'VueX',
          'Vuetify',
          'TailwindCSS',
          'RestAPI',
          'Cloudinary',
          'Atomic Design'
        ),
        achievements: [
          'Delivered admin and storefront features with SEO optimization and online payment integration.',
          'Built reusable UI components following Atomic Design principles, improving maintainability and consistency.'
        ],
        imageUrl: '/bds-vinh.png',
        imageUrlMobile: '/bds-vinh-mobile.png'
      }
    ]
  },
  {
    year: 'Late 2021',
    projects: [
      {
        title: 'MIPART – Ecommerce Website',
        summary:
          'Developed a customizable eCommerce website for component ordering with real-time pricing and back-office management.',
        stacks: stacks(
          'Vue.js',
          'Nuxt.js',
          'TypeScript',
          'TailwindCSS',
          'GSAP Animation',
          'GraphQL Integration'
        ),
        achievements: [
          'Developed and delivered a reusable UI library, reducing duplicate code and boosting team productivity.',
          'Worked closely with German team to translate design specs into production-ready UI assets',
          'Applied Agile and Scrum practices to ensure efficient project management and delivery.'
        ],
        imageUrl: '',
        imageUrlMobile: ''
      }
    ]
  },
  {
    year: '2022',
    projects: [
      {
        title: 'QR Code Generator Website - QR TIGER',
        summary:
          'A QR code generator website with vary type of qr code that allows users to customize QR codes and track valuable customer data.',
        stacks: stacks(
          'Next.js',
          'JavaScript',
          'React Query',
          'Bootstrap',
          'Formik',
          'RestAPI',
          'Google Map API'
        ),
        achievements: [
          'Refactored legacy codebase, reducing bundle size by 25% and improving load time by 40%, using react Query, Context for both Store-front and Admin Dashboard',
          'Became a core project member, developing key features and ensuring on-time delivery.'
        ],
        imageUrl: '/qr-tiger.png',
        imageUrlMobile: '/qr-tiger-mobile.png'
      }
    ]
  },
  {
    year: '2023',
    projects: [
      {
        title: 'Japanese Waste Management System',
        summary:
          'Enhanced a legacy Japanese Waste Management system by migrating from BizDesigner to a modern ReactJS frontend.',
        stacks: stacks(
          'React.js',
          'Bootstrap',
          'TypeScript',
          'Redux',
          'Redux Thunk',
          'React Hook Form'
        ),
        achievements: [
          'Initiated and delivered project from scratch with dynamic customization features.',
          'Recognized as a core member of the project, developing major features and interviewed fresher teammates.',
        ],
        imageUrl: '',
        imageUrlMobile: ''
      }
    ]
  },
  {
    year: 'Start 2024',
    projects: [
      {
        title:
          'Vietcap IQ - The Most Comprehensive Stock Analysis Platform in Vietnam',
        summary:
          'Website provides insights into stock market news on companies, industries, macroeconomics, and strategies in the Vietnamese market, evaluated by experts from Vietcap Securities.',
        stacks: stacks(
          'React.js',
          'TypeScript',
          'Redux',
          'Bootstrap',
          'Mantine',
          'E-Chart',
          'AgGrid',
          'TradingView'
        ),
        achievements: [
          'Optimized rendering and state management to ensure smooth UI performance under high-frequency real-time updates.',
          'Developed real-time features using WebSockets with Redux, ECharts, and Ag-Grid to display live data'
        ],
        imageUrl: '/vietcap-iq.png',
        imageUrlMobile: '/vietcap-iq-mobile.png'
      },
      {
        title: 'Vietcap AI News - AI-Powered Stock Investment News',
        summary:
          'A website about Vietnamese stock market news aggregation platform with continuous updates and AI-powered article and company evaluations.',
        stacks: stacks('React.js', 'TypeScript', 'Redux', 'Mantine', 'Echart'),
        achievements: [
          'Initiated and delivered project, implementing core features and launching successfully within one month.',
          'Enhanced SEO and page performance by implementing server-side rendering content for a React.js application'
        ],
        imageUrl: '/vietcap-ai-news.png',
        imageUrlMobile: '/vietcap-ai-news-mobile.png'
      }
    ]
  }
];
