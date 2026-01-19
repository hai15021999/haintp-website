import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, of } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class ProjectDetailService {
    #httpClient = inject(HttpClient);
    
    private __directoryPath: string = 'assets/project-md';

    loadProjectDetailMarkdown$(projectId: string) {
        const path = `${this.__directoryPath}/${projectId}.md`;
        return this.#httpClient.get(path, { responseType: 'text' }).pipe(
            catchError((__) => {
                return of(`# Cannot load project details`);
            })
        );
    }
}