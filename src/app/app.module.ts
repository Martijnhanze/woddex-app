import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppStateModule} from "./states/app-state-module";
import {AppEffectModule} from "./states/app-effect.module";
import {environment} from "../environments/environment";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {RepositoryModule} from "./repositories/repository.module";
import {ServiceModule} from "./services/service.module";
import {NotFoundInterceptor} from "./services/interceptors/not-found.interceptor";
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

const devImports = [
    StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
    }),
];

@NgModule({
    declarations: [
        AppComponent,
        ArticleEditorComponent,
        SidebarComponent,
    ],
    imports: [
        StoreModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AppStateModule,
        AppEffectModule,
        RepositoryModule,
        ServiceModule,
        environment.production ? [] : devImports,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotFoundInterceptor,
            multi: true
        }
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
