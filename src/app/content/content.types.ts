/**
 * Content model. Every page reads from these types; no page hard-codes profile, project or resume text.
 * Spec: docs/00-ssot/api-contracts.md § Content contracts.
 */

/** Year-month in ISO form, e.g. '2026-01'. */
export type YearMonth = `${number}-${number}`;

export interface Period {
    start: YearMonth;
    /** Omit for an ongoing item ("Present"). */
    end?: YearMonth;
}

export interface SocialLink {
    id: 'github' | 'facebook' | 'instagram' | 'linkedin';
    label: string;
    url: string;
}

export interface Profile {
    fullName: string;
    displayName: string;
    role: string;
    location: string;
    /** First month of professional front-end work. Drives "years of experience". */
    careerStart: YearMonth;
    headline: string;
    summary: string;
    /** Public contact details, published at the owner's request (2026-11-18). */
    email: string;
    phone: { display: string; tel: string };
    avatar: string;
    portrait: string;
    socials: SocialLink[];
}

export interface Technology {
    id: string;
    name: string;
    note: string;
    /** Path under src/assets/logos, or undefined for text-only. */
    logo?: string;
}

export interface SkillGroup {
    id: string;
    title: string;
    summary: string;
    icon: IconName;
    items: Technology[];
}

export type ProjectType = 'professional' | 'personal';

export interface ProjectLink {
    label: string;
    url: string;
    kind: 'source' | 'live' | 'docs';
}

export interface Project {
    /** URL slug: /portfolio/:slug. Lowercase kebab-case, never reused. */
    slug: string;
    title: string;
    type: ProjectType;
    /** One sentence, shown on cards. */
    summary: string;
    /** Client or employer context, shown on the detail page. */
    context?: string;
    /** Omit when unknown or confidential. */
    role?: string;
    period?: Period;
    stack: string[];
    highlights: string[];
    /** Cover image path (assets/images/projects/*). 16:9. */
    cover: string;
    /** Optional long-form Markdown under src/assets/case-studies/<slug>.md */
    caseStudy?: boolean;
    links?: ProjectLink[];
    featured?: boolean;
    /**
     * Company policy forbids details. Only title, summary and cover are shown; the detail page shows a
     * confidentiality notice instead of role, period, stack, highlights or case study. Keep those fields empty.
     */
    confidential?: boolean;
}

export interface ExperienceItem {
    id: string;
    company: string;
    title: string;
    period: Period;
    location?: string;
    summary: string;
    achievements: string[];
    stack: string[];
    /** Project slugs to cross-link to the portfolio. */
    projects?: string[];
}

export interface EducationItem {
    id: string;
    school: string;
    degree: string;
    period: Period;
    logo?: string;
}

export interface Resume {
    summary: string;
    experience: ExperienceItem[];
    education: EducationItem[];
    /** Short labels grouped for the resume sidebar. */
    skills: { group: string; items: string[] }[];
    languages: { name: string; level: string }[];
}

/** Names accepted by <app-icon>. Keep in sync with shared/icon/icon.paths.ts. */
export type IconName =
    | 'user'
    | 'briefcase'
    | 'file-text'
    | 'mail'
    | 'github'
    | 'facebook'
    | 'instagram'
    | 'linkedin'
    | 'external'
    | 'arrow-right'
    | 'arrow-left'
    | 'menu'
    | 'panel'
    | 'sun'
    | 'moon'
    | 'monitor'
    | 'code'
    | 'palette'
    | 'layers'
    | 'server'
    | 'git-branch'
    | 'graduation'
    | 'map-pin'
    | 'calendar'
    | 'printer'
    | 'search'
    | 'send'
    | 'check'
    | 'alert'
    | 'x'
    | 'download'
    | 'lock'
    | 'sparkles'
    | 'network'
    | 'phone';
