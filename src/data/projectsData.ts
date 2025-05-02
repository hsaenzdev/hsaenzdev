import { ProjectData } from '../components/RetroProjectCard';

export const projectsData: ProjectData[] = [
  {
    id: 'document-management',
    title: 'Document Management Platform',
    shortDescription: 'Led the development of a comprehensive document management platform for enterprise clients.',
    fullDescription: 
      'Developed and launched a comprehensive document management platform for enterprise clients at Classifile de México. The platform features intuitive document organization, version control, access permissions, and search functionality. It streamlined document workflows for clients across various industries, significantly reducing paper usage and improving operational efficiency.',
    technologies: ['PHP', 'JavaScript', 'MySQL', 'AWS S3', 'REST API'],
    skills: [
      { name: 'Backend Development', level: 9 },
      { name: 'Database Design', level: 8 },
      { name: 'Security Implementation', level: 7 },
      { name: 'API Development', level: 8 }
    ],
    learnings: [
      'Designed robust document classification systems',
      'Implemented secure document storage with encryption',
      'Created efficient search algorithms for large document repositories',
      'Developed access control systems based on user roles'
    ],
    year: '2018-2021',
  },
  {
    id: 'cloud-storage',
    title: 'Secure Cloud Storage & Sync',
    shortDescription: 'Developed a secure cloud storage and sync service with end-to-end encryption.',
    fullDescription: 
      'Created a secure cloud storage and synchronization service for Classifile de México that allowed clients to store, access, and share files securely across multiple devices. Implemented end-to-end encryption, delta sync algorithms for efficient bandwidth usage, and real-time collaboration features. The solution was built with a focus on security, performance, and ease of use.',
    technologies: ['C#', '.NET', 'AWS', 'MongoDB', 'WebSockets'],
    skills: [
      { name: 'Cloud Architecture', level: 9 },
      { name: 'Encryption', level: 8 },
      { name: 'Sync Algorithms', level: 7 },
      { name: 'Performance Optimization', level: 8 }
    ],
    learnings: [
      'Implemented efficient delta sync algorithms for bandwidth optimization',
      'Designed secure key management systems',
      'Built real-time conflict resolution mechanisms',
      'Created cross-platform compatibility solutions'
    ],
    year: '2016-2019',
  },
  {
    id: 'file-classification',
    title: 'Intelligent File Classification System',
    shortDescription: 'Created an intuitive file classification system with AI-assisted categorization.',
    fullDescription: 
      'Designed and developed an intelligent file classification system for Classifile de México that automatically categorizes documents based on content, metadata, and usage patterns. The system utilizes machine learning algorithms to improve classification accuracy over time and provides an intuitive interface for manual classification when needed. This solution significantly reduced the time spent organizing documents and improved findability.',
    technologies: ['PHP', 'Python', 'TensorFlow', 'MySQL', 'REST API'],
    skills: [
      { name: 'AI/ML Integration', level: 7 },
      { name: 'Algorithm Design', level: 8 },
      { name: 'UX Design', level: 6 },
      { name: 'Backend Development', level: 9 }
    ],
    learnings: [
      'Integrated machine learning for document classification',
      'Developed adaptive learning systems for improved accuracy',
      'Created intuitive UX for complex classification tasks',
      'Implemented efficient document indexing mechanisms'
    ],
    year: '2015-2017',
  },
  {
    id: 'custom-integrations',
    title: 'Enterprise System Integrations',
    shortDescription: 'Built custom integrations connecting document systems with client enterprise software.',
    fullDescription: 
      'Developed custom integrations for Classifile de México that seamlessly connected the document management platform with clients\' existing enterprise systems such as ERP, CRM, and accounting software. These integrations enabled automatic document routing, indexing, and retrieval based on business processes. Created both standard connectors for popular systems and custom solutions for proprietary software.',
    technologies: ['C#', '.NET', 'RESTful APIs', 'SOAP', 'Message Queues'],
    skills: [
      { name: 'Systems Integration', level: 9 },
      { name: 'API Development', level: 8 },
      { name: 'Enterprise Architecture', level: 7 },
      { name: 'Security', level: 8 }
    ],
    learnings: [
      'Designed robust error handling and recovery mechanisms',
      'Implemented secure authentication between disparate systems',
      'Created efficient data transformation pipelines',
      'Developed solutions for legacy system compatibility'
    ],
    year: '2014-2020',
  },
  {
    id: 'data-visualization',
    title: 'Interactive Data Visualization Dashboards',
    shortDescription: 'Developed interactive data visualization dashboards using amCharts at Sonatafy Technology.',
    fullDescription: 
      'At Sonatafy Technology, developed sophisticated interactive data visualization dashboards using amCharts that transformed complex datasets into intuitive, actionable insights. These dashboards featured real-time data updates, interactive filtering, drill-down capabilities, and customizable views. The visualizations helped stakeholders identify trends, patterns, and opportunities that would be difficult to recognize in raw data.',
    technologies: ['TypeScript', 'React', 'amCharts', 'Material UI', 'REST APIs'],
    skills: [
      { name: 'Data Visualization', level: 9 },
      { name: 'Frontend Development', level: 8 },
      { name: 'UX Design', level: 7 },
      { name: 'Performance Optimization', level: 8 }
    ],
    learnings: [
      'Designed effective data visualizations for complex information',
      'Implemented responsive and adaptive chart layouts',
      'Optimized performance for large datasets',
      'Created intuitive user interactions for data exploration'
    ],
    year: '2022-Present',
    githubUrl: '#'
  },
  {
    id: 'feature-flags',
    title: 'Feature Flag Implementation',
    shortDescription: 'Implemented feature flags with Launch Darkly for controlled feature releases.',
    fullDescription: 
      'Successfully implemented feature flags using Launch Darkly at Sonatafy Technology, enabling controlled, targeted feature releases and A/B testing capabilities. This implementation allowed for gradual rollouts, instant feature toggling, and targeted user testing. The system significantly reduced deployment risks and enabled more frequent releases by decoupling feature deployment from feature release.',
    technologies: ['TypeScript', 'React', 'Launch Darkly', 'Elixir', 'Phoenix'],
    skills: [
      { name: 'Feature Flag Management', level: 9 },
      { name: 'Release Management', level: 8 },
      { name: 'Testing Strategy', level: 7 },
      { name: 'Full Stack Integration', level: 9 }
    ],
    learnings: [
      'Implemented sophisticated targeting rules for phased rollouts',
      'Developed strategies for testing in production safely',
      'Created monitoring systems to evaluate feature impact',
      'Integrated feature flags across frontend and backend systems'
    ],
    year: '2022-2023',
    githubUrl: '#'
  },
  {
    id: 'student-database',
    title: 'University Library Student Database',
    shortDescription: 'Built a student database system for the university library during my studies.',
    fullDescription: 
      'During my computer science studies at Universidad Autónoma de Tamaulipas, I built a comprehensive student database system for the university library. The system managed student records, book loans, returns, and fines. It featured reporting capabilities, automated notifications for overdue books, and integration with the university\'s student information system. This project was used by the library staff to improve operational efficiency.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'CSS', 'HTML'],
    skills: [
      { name: 'Database Design', level: 7 },
      { name: 'Web Development', level: 6 },
      { name: 'UI Design', level: 5 },
      { name: 'System Architecture', level: 6 }
    ],
    learnings: [
      'Designed relational database schemas for complex relationships',
      'Implemented user authentication and role-based access control',
      'Created automated notification systems',
      'Developed reporting and analytics capabilities'
    ],
    year: '2013-2014',
  }
]; 