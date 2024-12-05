import { IProject } from "@common/interfaces";


export const PROJECTS: IProject[] = [
    {
        id: '1',
        title: 'Excel TaskPane Add-in',
        description: 'Worked on a productivity tool that integrates with data sources such as SharePoint lists and Dataverse to present data as interactive Excel-like tables.',
        thumbnail: '/assets/images/project_excel_thumbnail.jpg',
        technologies: ['Angular', 'NodeJS'],
        role: 'Frontend Developer, Backend Developer, DevOps',
        features: [
            'Integration with SharePoint lists and Dataverse',
            'Excel-like table with sorting, filtering, and pagination',
            'Customizable columns and column types',
            'Support for data synchronization with the server for batch updates',
            'Support for data validation and error handling',
            'Enhanced user experience for viewing, editing, and calculating data across multiple rows and columns.'
        ],
        type: 'professional',
    },
    {
        id: '2',
        title: 'Helpdesk System',
        description: 'Developed a helpdesk system that allows users to submit, track, and manage support tickets for various issues and requests.',
        thumbnail: '/assets/images/project_helpdesk_thumbnail.jpg',
        technologies: ['Angular', 'Syncfusion UI'],
        role: 'Frontend Developer',
        features: [
            'User-friendly interface for submitting and tracking support tickets',
            'Ticket management with status updates and notifications',
            'Integration with email for ticket creation and updates',
            'Role-based access control for users and administrators',
            'Reporting and analytics for ticket resolution and performance tracking',
            'Communication with users via comment for ticket updates and resolution',
        ],
        type: 'professional',
    },
    {
        id: '3',
        title: 'Admin Portal',
        description: 'Built an admin portal that provides administrators with tools to manage users, product object, workflow and settings for the product applications.',
        thumbnail: '/assets/images/project_admin_portal_thumbnail.webp',
        technologies: ['Angular', 'Syncfusion UI', 'NodeJS', 'MongoDB'],
        role: 'Frontend Developer',
        features: [
            'User management with user creation, deletion, and role assignment',
            'Product object management with CRUD operations and validation',
            'Workflow management with task assignment, status updates, and notifications',
            'Settings management with configuration options and customization',
        ],
        type: 'professional',
    },
    {
        id: '4',
        title: 'Bingo Game',
        description: 'Developed a bingo game that allows users to play bingo online with friends and family.',
        thumbnail: '/assets/images/project_bingo_thumbnail.png',
        technologies: ['ReactJs', 'NodeJS', 'Socket.io'],
        role: 'Frontend Developer, Backend Developer, Project Manager, DevOps, Tester, UX/UI Designer, Product Owner',
        features: [
            'User registration and login with social media integration',
            'Game lobby with chat functionality and game settings',
            'Bingo board with randomized numbers and game cards',
            'Real-time gameplay with number calling and card marking',
            'Winning conditions with automatic detection and game completion',
        ],
        type: 'personal',
    },
    {
        id: '5',
        title: 'Bonsai Business Services System',
        description: 'Developed a business services system that allows users to manage their bonsai business, including clients, services.',
        thumbnail: '/assets/images/project_bonsai_thumbnail.png',
        technologies: ['ReactJs', 'Java', 'Spring Boot', 'MySQL', 'Flutter'],
        role: 'Frontend Developer, Project Manager, Tester, UX/UI Designer, Product Owner',
        features: [
            'Web application for Owner and Manager to manage bonsai business',
            'Mobile application for Staff and Client to view and book services',
            'Onwer management with CRUD stores, bonsai inventory and services',
            'Statistics and analytics for owner performance tracking',
            'Manager oversee bonsai care contracts and store staff',
            'Staff manage bonsai care contracts and services',
            'Client view and book services',
        ],
        type: 'personal',
    }
]