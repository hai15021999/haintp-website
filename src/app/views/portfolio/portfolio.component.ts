import { Component } from "@angular/core";
import { BaseComponent } from "@common/base";



@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss'],
    standalone: true,
    imports: [],
})
export class PortfolioComponent extends BaseComponent {

    registerCoreLayer() {
        
    }

    ngOnInit() {
        this.registerAppStateChanged();
        this.registerCoreLayer();
    }

    
}