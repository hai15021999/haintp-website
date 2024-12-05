export interface IProject {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    technologies: string[];
    role: string;
    features: string[];
    type: 'professional' | 'personal';
    url?: string;
}