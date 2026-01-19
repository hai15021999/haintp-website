import { ChangeDetectionStrategy, Component, signal, WritableSignal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { getExpandCollapseVerticalTrigger } from "@common/animations";
import { BaseComponent } from "@common/base";
import { CalculateComponentHeightDirective } from "@common/directives";
import { calculateExperience } from "@common/functions";
import { IProject } from "@common/interfaces";
import { PROJECTS } from "@common/mocks";

interface IExpandCollapseState {
    hasExpanded: boolean;
    isExpanded: boolean;
}

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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent extends BaseComponent {

    professionalProjects: IProject[] = [];
    personalProjects: IProject[] = [];
    
    professionalProjectsExpanded: WritableSignal<IExpandCollapseState> = signal({
        hasExpanded: false,
        isExpanded: false,
    });
    personalProjectsExpanded: WritableSignal<IExpandCollapseState> = signal({
        hasExpanded: false,
        isExpanded: false,
    });

    yearExperience: number = 0;
    startDate: Date = new Date('2020-06-01');
    
    isDataLoading: WritableSignal<boolean> = signal(true);

    registerCoreLayer() {
        this.loadData();
        this.appState.setCurrentPage('portfolio');
        this.yearExperience = calculateExperience(this.startDate, new Date());
        this.isDataLoading.set(false);
    }

    ngOnInit() {
        this.registerCoreLayer();
    }

    loadData() {
        const __projects = PROJECTS;
        this.professionalProjects = __projects.filter(project => project.type === 'professional');
        // this.professionalProjectsExpanded['hasExpanded'] = this.professionalProjects.length > 2;
        this.professionalProjectsExpanded.update(state => ({
            ...state,
            hasExpanded: this.professionalProjects.length > 2
        }))
        this.personalProjects = __projects.filter(project => project.type === 'personal');
        // this.personalProjectsExpanded['hasExpanded'] = this.personalProjects.length > 2;
        this.personalProjectsExpanded.update(state => ({
            ...state,
            hasExpanded: this.personalProjects.length > 2
        }))
    }

    toggleExpandCollapse(type: 'professionalProjects'| 'personalProjects') {
        this[type + 'Expanded']?.update(state => ({
            ...state,
            isExpanded: !state.isExpanded
        }));
    }

    onHeighChecked(args: boolean, type: 'professionalProjects'| 'personalProjects') {
        this[type + 'Expanded']?.update(state => ({
            ...state,
            hasExpanded: args
        }));
    }

    openProjectDetail(projectId: string) {
        this.router.navigate([`/project/werewolf-moon-light`]);
    }
}