import { Component } from '@angular/core';
import { BaseComponent } from '@common/base';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.scss'],
    standalone: true,
    imports: [MatIconModule],
})
export class AboutMeComponent extends BaseComponent {
    isDataLoading: boolean = true;

    skills: {
        icons: string[];
        title: string;
        description: string;
    }[] = [];

    ngOnInit() {
        this.registerAppStateChanged();
        this.registerCoreLayer();
    }

    registerCoreLayer() {
        this.bindingData();
    }

    redirectTo(page: 'portfolio' | 'resume') {
        this.appState.currentPage = page;
        this.state.commit(this.appState);
        this.router.navigate([`/${page}`]);
    }

    bindingData() {
        const skills = [
            {
                icons: ['common:ic_javascript'],
                title: 'JavaScript',
                description: `I have a strong command of JavaScript, enabling me to build dynamic and interactive web applications with ease. From working with ES6+ features to
                            handling complex logic and DOM manipulation, I craft efficient and responsive solutions. I specialize in integrating APIs, optimizing performance, and
                            leveraging modern frameworks and libraries. My focus is on writing clean, maintainable code that powers seamless user experiences.`,
            },
            {
                icons: ['common:ic_react'],
                title: 'React',
                description: `I am proficient in React, using it to create scalable, high-performance web applications. I have experience with React hooks, context, and
                            lifecycle methods, allowing me to build reusable components and manage state effectively. I am skilled in routing, form handling, and data fetching
                            with React, ensuring that my applications are robust, reliable, and user-friendly.`,
            },
            {
                icons: ['common:ic_angular'],
                title: 'Angular',
                description: `I have a solid foundation in Angular, enabling me to develop dynamic and feature-rich web applications. I am well-versed in Angular components,
                            services, directives, and modules, allowing me to create modular and maintainable codebases. I have experience with Angular CLI, RxJS, and NgRx, and
                            I am proficient in handling routing, forms, and HTTP requests in Angular applications.`,
            },
            {
                icons: ['common:ic_html', 'common:ic_css'],
                title: 'HTML & CSS',
                description: `I am skilled in HTML and CSS, using them to create responsive and visually appealing web pages. I have experience with semantic HTML, CSS
                            preprocessors, and modern layout techniques, allowing me to build websites that are accessible, responsive, and cross-browser compatible. I am
                            proficient in using Flexbox and Grid to create flexible and adaptive layouts, and I have a keen eye for design and detail.`,
            },
            {
                icons: ['common:ic_git', 'common:ic_github', 'common:ic_azuredevops'],
                title: 'Version Control',
                description: `I am proficient in using Git and GitHub to manage version control and collaborate on projects. I have experience with branching, merging, and
                            resolving conflicts in Git, allowing me to work effectively in a team environment. I am familiar with GitHub workflows, pull requests, and code
                            reviews, and I use Git to track changes, revert commits, and maintain a clean and organized codebase.`,
            },
            {
                icons: ['common:ic_npm'],
                title: 'NPM',
                description: `I have experience with NPM, using it to manage dependencies, scripts, and packages in JavaScript projects. I am proficient in installing,
                            updating, and removing packages with NPM, and I use it to run scripts, manage versions, and handle dependencies in my applications. I am familiar
                            with NPM commands, configuration, and best practices, and I leverage NPM to streamline my development workflow and optimize project performance.`,
            },
            {
                icons: ['common:ic_nodejs'],
                title: 'Node.js',
                description: `I have experience with Node.js, using it to build server-side applications and APIs. I am proficient in using Express.js to create RESTful
                            APIs, handle requests, and manage routes. I have experience with middleware, authentication, and error handling in Node.js applications, and I am
                            skilled in working with databases, such as MongoDB and MySQL, to store and retrieve data.`,
            },
            
        ];
        this.skills = skills;
        this.isDataLoading = false;
        this.cdr.detectChanges();
    }
}
