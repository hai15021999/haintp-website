import { Profile } from './content.types';

export const PROFILE: Profile = {
    fullName: 'Nguyen Tran Phuong Hai',
    displayName: 'Hai Nguyen',
    role: 'Front-end Developer',
    location: 'Ho Chi Minh City, Vietnam',
    careerStart: '2020-06',
    headline: 'I build Angular applications, design systems and data-dense business tools.',
    summary:
        'Front-end developer focused on enterprise web apps: Microsoft 365 add-ins, helpdesk and admin portals, and a real-estate valuation platform. ' +
        'I care about clear UI systems, accessible controls and code that the next developer — human or AI — can change safely.',
    email: 'hai15021999@gmail.com',
    phone: { display: '+84 911 384 048', tel: '+84911384048' },
    avatar: 'assets/images/avatar.png',
    portrait: 'assets/images/avatar_about_me.jpg',
    socials: [
        { id: 'github', label: 'GitHub', url: 'https://github.com/hai15021999' },
        { id: 'facebook', label: 'Facebook', url: 'https://fb.com/cabsapphire' },
        { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/hiamcasber' },
    ],
};
