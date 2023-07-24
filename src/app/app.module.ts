import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpLoaderFactory, SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'environments/environment';
import { HttpInterceptorProviders } from './shared/interceptors';
import { LocalizationService } from './shared/localization/localization.service';
import { MessageService } from 'primeng/api';
import { ErrorHandling } from './shared/handlers/error-handling.handler';
import { AuthModule } from './auth/auth.module';
import { appReducers } from './shared/state/state.index';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule.forRootOrChild(),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [
    HttpInterceptorProviders,
    LocalizationService,
    MessageService,
    { provide: ErrorHandler, useClass: ErrorHandling },
    { provide: LOCALE_ID, useValue: 'he' },
    { provide: LocationStrategy, useClass: PathLocationStrategy } //PathLocationStrategy avoid # in url
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
