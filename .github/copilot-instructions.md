# AI Agent Instructions for HaiNTP Personal Website

## Project Overview
Angular 19 personal portfolio website (standalone components, no modules) using Material Design, Tailwind CSS, and Angular Signals for state management. Built with TypeScript 5.5+ in strict mode.

## Architecture & Key Patterns

### Component Structure
- **All components extend `BaseComponent`** ([src/app/common/base/base.component.ts](src/app/common/base/base.component.ts)) which provides:
  - Pre-injected common services: `cdr`, `appState`, `router`, `snackbarService`, `dialog`, `destroyRef`
  - Built-in `loadingDialog` helper with `open()` and `close()` methods
  - Required `registerCoreLayer()` abstract method - implement this for component initialization logic
- **Components are standalone** with `changeDetection: ChangeDetectionStrategy.OnPush` by default
- Call `registerCoreLayer()` in `ngOnInit()` for initialization (see [portfolio.component.ts](src/app/views/portfolio/portfolio.component.ts))

### State Management
**Use Angular Signals exclusively** - the legacy `StateService` exists but is deprecated.

- Global state: `AppStateService` ([src/app/app.state.ts](src/app/app.state.ts))
- Access via injected `appState` from `BaseComponent` or inject directly
- Update with `appState.updateState({ key: value })` or convenience methods like `appState.setScreenSize('large')`
- Individual properties exposed as computed signals: `appState.screenSize()`, `appState.currentPage()`
- Component-level state: Use `WritableSignal<T> = signal(initialValue)` with `.update()` for mutations

### Path Aliases (tsconfig.json)
Always use barrel exports with path aliases instead of relative imports:
- `@common/base` → base components
- `@common/components` → shared UI components
- `@common/services` → shared services
- `@common/directives` → custom directives
- `@common/pipes` → custom pipes
- `@common/animations` → animation utilities
- `@common/functions` → utility functions
- `@common/interfaces` → TypeScript interfaces
- `@common/mocks` → mock data
- `@app-config` → app-level configuration
- `@app-state` → global state service
- `@environment` → environment configuration

Example: `import { BaseComponent } from '@common/base';` not `import { BaseComponent } from '../common/base/base.component';`

### Routing
- Lazy-loaded routes using `loadComponent` ([app.routes.ts](src/app/app.routes.ts))
- Views in `src/app/views/` organized by feature
- Update `appState.setCurrentPage()` in component's `registerCoreLayer()`

### Styling
- **Tailwind utility classes** for layout and common styling
- **Custom color palette** defined in [tailwind.config.js](tailwind.config.js): `Grayscale[0-1000]`, `Burgundy[20-180]`, `Gold[20-180]`, etc.
- **Material themes** in `src/styles/material/`: light/dark theme SCSS with pre-defined component overrides
- **SCSS variables** in [src/styles/variable.scss](src/styles/variable.scss) for Material theming
- Global styles use `:root` for Tailwind `important` selector

### Angular Schematics Configuration
Project skips test file generation for all schematics ([angular.json](angular.json)):
```json
"skipTests": true  // applies to components, services, directives, pipes, etc.
```

## Development Workflows

### Build & Run
- **Dev server**: `npm start` → `ng serve` (http://localhost:4200)
- **Production build**: `npm run build_prod` → allocates 10GB heap for large builds
- **Watch mode**: `npm run watch`

### Creating New Components
```bash
ng generate component views/feature-name
# or
ng g c views/feature-name
```
- Component will be standalone by default with SCSS and no spec file
- Must extend `BaseComponent` and implement `registerCoreLayer()`
- Add route to [app.routes.ts](src/app/app.routes.ts) with lazy loading

### Working with Material Components
- Import individual Material modules in component (e.g., `MatIconModule`, `MatDialogModule`)
- Use `dialog.open()` from `BaseComponent` for dialogs
- See [LoadingDialogComponent](src/app/common/components/loading-dialog/loading-dialog.component.ts) for dialog examples

### Custom Animations
- Import from `@common/animations` (e.g., `getExpandCollapseVerticalTrigger`)
- Add to component `animations` metadata
- Example in [portfolio.component.ts](src/app/views/portfolio/portfolio.component.ts#L18-L21)

## Services & Utilities

### SnackbarService
Reactive notification system using Observables:
```typescript
this.snackbarService.showSnackbar('Message text', 'success' | 'info' | 'error');
```

### HTTP Interceptor
- Configured in [app.config.ts](src/app/app.config.ts) via `withInterceptors([appInterceptor])`
- Currently pass-through but ready for auth headers ([app.interceptor.ts](src/app/app.interceptor.ts))

### Project Data
- Mock data in `@common/mocks` (e.g., `PROJECTS` constant)
- Markdown content in `src/assets/project-md/`
- Uses `ngx-markdown` for rendering project descriptions

## Important Conventions
- **No implicit any**: TypeScript strict mode with `noImplicitAny: false` but prefer explicit types
- **Use signals over RxJS** for component state (BehaviorSubjects are legacy)
- **Always use ChangeDetectorRef**: Accessible via `this.cdr` from `BaseComponent`
- **Material + Tailwind coexist**: Material for interactive components, Tailwind for layout
- **Barrel exports everywhere**: Every feature folder has `index.ts` re-exporting contents

## Common Pitfalls
- Forgetting to extend `BaseComponent` → loses injected services
- Not implementing `registerCoreLayer()` → compilation error
- Using relative imports → breaks path aliases
- Forgetting `.update()` on signals → state won't update
- Not marking components standalone → import errors
