import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { APP_ROUTING, APP_ROUTING_PROVIDERS } from "./app.routes";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ADAL_PROVIDERS, AVANTIQ_PROVIDERS, OFFICE365_PROVIDERS } from "./shared/index";
import { UserAccountComponent } from './shared/user-account/user-account.component';
import { ActivitiesComponent } from './activities/activities.component';
import { SearchComponent } from './search/search.component';

// Kendo UI
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { OrganizeMenuComponent } from './shared/left-menu/organize-menu/organize-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserAccountComponent,
    ActivitiesComponent,
    SearchComponent,
    OrganizeMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING,
    GridModule, LayoutModule
  ],
  providers: [
    ...APP_ROUTING_PROVIDERS,
    ...ADAL_PROVIDERS,
    ...AVANTIQ_PROVIDERS,
    ...OFFICE365_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
