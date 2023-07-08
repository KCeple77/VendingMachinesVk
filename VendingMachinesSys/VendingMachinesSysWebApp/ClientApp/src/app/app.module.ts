import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from '../api-authorization/login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { VendingSysToolbarComponent } from './vending-sys-toolbar/vending-sys-toolbar.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { LocationsComponent } from './locations/locations.component';
import { MachinesListComponent } from './machines-list/machines-list.component';
import { AboutComponent } from './about/about.component';
import { CarouselModule } from 'primeng/carousel';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AnimateModule } from 'primeng/animate';
import { DataViewModule } from 'primeng/dataview';
import { VendingMachinesService } from 'src/services/vending.machines.service';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VendingSysToolbarComponent,
    LocationsComponent,
    AboutComponent,
    PageNotFoundComponent,
    NavMenuComponent,
    MachinesListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    ToolbarModule,
    ButtonModule,
    CarouselModule,
    LeafletModule,
    AnimateModule,
    DataViewModule,
    AccordionModule,
    RouterModule.forRoot([
      { path: '', component: LandingPageComponent, pathMatch: 'full' },
      { path: 'pages/home', component: HomeComponent, pathMatch:'full'},
      { path: 'pages/locations', component: LocationsComponent, pathMatch:'full'},
      { path: 'pages/machines-list', component: MachinesListComponent, pathMatch:'full'},
      { path: 'pages/about', component: AboutComponent, pathMatch:'full'},
      { path: 'page-not-found', component: PageNotFoundComponent, pathMatch:'full'},
      { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    VendingMachinesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
