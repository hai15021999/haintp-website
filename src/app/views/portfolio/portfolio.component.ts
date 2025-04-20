import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { getExpandCollapseVerticalTrigger } from "@common/animations";
import { BaseComponent } from "@common/base";
import { CalculateComponentHeightDirective } from "@common/directives";
import { calculateExperience } from "@common/functions";
import { IProject } from "@common/interfaces";
import { PROJECTS } from "@common/mocks";


@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss'],
    standalone: true,
    imports: [
        MatIconModule,
        CalculateComponentHeightDirective
    ],
    animations: [
        getExpandCollapseVerticalTrigger('expandCollapse', '__expanded', '__collapsed', '10rem'),
    ]
})
export class PortfolioComponent extends BaseComponent {

    professionalProjects: IProject[] = [];
    personalProjects: IProject[] = [];
    
    professionalProjectsExpanded = {
        hasExpanded: false,
        isExpanded: false,
    };
    personalProjectsExpanded = {
        hasExpanded: false,
        isExpanded: false,
    };

    yearExperience: number = 0;
    startDate: Date = new Date('2020-06-01');

    registerCoreLayer() {
        this.loadData();
        this.setCurrentPage('portfolio');
        this.yearExperience = calculateExperience(this.startDate, new Date());
    }

    ngOnInit() {
        this.registerAppStateChanged();
        this.registerCoreLayer();
    }

    loadData() {
        const __projects = PROJECTS;
        this.professionalProjects = __projects.filter(project => project.type === 'professional');
        this.professionalProjectsExpanded['hasExpanded'] = this.professionalProjects.length > 2;
        this.personalProjects = __projects.filter(project => project.type === 'personal');
        this.personalProjectsExpanded['hasExpanded'] = this.personalProjects.length > 2;
    }

    toggleExpandCollapse(type: 'professionalProjects'| 'personalProjects') {
        this[type + 'Expanded'].isExpanded = !this[type + 'Expanded'].isExpanded;
    }

    onHeighChecked(args: boolean, type: 'professionalProjects'| 'personalProjects') {
        this[type + 'Expanded'].hasExpanded = args;
    }
}