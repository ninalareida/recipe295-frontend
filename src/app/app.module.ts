import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthConfig, OAuthModule, OAuthStorage} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {HttpXSRFInterceptor} from './interceptor/http.csrf.interceptor';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {AppAuthGuard} from './guard/app.auth.guard';
import { AppAuthService } from './service/app.auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ChefComponent } from './pages/chef/chef.component';
import { TipComponent } from './pages/tip/tip.component';
import { MealComponent } from './pages/meal/meal.component';
import {MatTableModule} from '@angular/material/table';
import { AppHeaderComponent } from './components/app-header/app-header.component'
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MealTypeComponent } from './pages/meal-type/meal-type.component'
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { IsInRoleDirective } from './dir/is.in.role.dir';
import { IsInRolesDirective } from './dir/is.in.roles.dir';
import { AutofocusDirective } from './dir/autofocus-dir';
import { MealDetailComponent } from './pages/meal-detail/meal-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/recipe',
  requireHttps: false,
  redirectUri: environment.frontendBaseUrl,
  postLogoutRedirectUri: environment.frontendBaseUrl,
  clientId: 'recipe',
  scope: 'openid profile roles offline_access',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  silentRefreshTimeout: 500,
  clearHashAfterLogin: true,
};

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    ChefComponent,
    TipComponent,
    MealComponent,
    AppHeaderComponent,
    MealTypeComponent,
    ConfirmDialogComponent,
    IsInRoleDirective,
    IsInRolesDirective,
    AutofocusDirective,
    MealDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    OAuthModule.forRoot({resourceServer: {sendAccessToken: true}}),
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    })
  ],
  providers: [
    {provide: AuthConfig, useValue: authConfig},
    {provide: HTTP_INTERCEPTORS, useClass: HttpXSRFInterceptor, multi: true},
    {
      provide: OAuthStorage, useFactory: storageFactory
    },
    AppAuthGuard,
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(authService: AppAuthService) {
    authService.initAuth().finally();
  }
}
