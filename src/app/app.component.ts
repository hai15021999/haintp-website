import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { AppNavBarComponent } from './nav-bar/app-nav-bar.component';
import { BaseComponent } from '@common/base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    TranslocoModule,
    AppNavBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent extends BaseComponent {
  
  override registerCoreLayer() {
    
  }
  
}
