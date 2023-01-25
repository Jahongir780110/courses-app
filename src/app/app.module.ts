import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

import { AuthInterceptor } from './services/auth.interceptor';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

import { loadingReducer } from './state/loading/loading.reducer';
import { authReducer } from './state/auth/auth.reducers';
import { coursesReducer } from './state/courses/courses.reducers';
import { AuthEffects } from './state/auth/auth.effects';
import { CoursesEffects } from './state/courses/courses.effects';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from 'src/environments/environment';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

// Don't forget to change hostUrl before prerendering!
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(
    http,
    environment.hostUrl + '/assets/i18n/',
    '.json'
  );
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
    EffectsModule.forRoot([AuthEffects, CoursesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    CoreModule,
    SharedModule,
    UserModule,
    StoreModule.forRoot({
      loading: loadingReducer,
      auth: authReducer,
      courses: coursesReducer,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
