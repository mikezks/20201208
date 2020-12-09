import { FlightCancellingModule } from "./flight-booking/flight-cancelling/flight-cancelling.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InjectionToken, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FlightLibModule, FlightService } from "@flight-workspace/flight-lib";

import { AppComponent } from "./app.component";
import { APP_ROUTES } from "./app.routes";
import { BasketComponent } from "./basket/basket.component";
import { FlightBookingModule } from "./flight-booking/flight-booking.module";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SharedModule } from "./shared/shared.module";
import { SidebarComponent } from "./sidebar/sidebar.component";

export interface BaseUrlType {
  key: string;
  url: string;
}

export const BASE_URL = new InjectionToken<BaseUrlType>('BASE_URL');


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FlightBookingModule,

    BrowserAnimationsModule,
    FlightCancellingModule,

    FlightLibModule.forRoot(),
    SharedModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: 'legacy' }),
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    BasketComponent
  ],
  providers: [
    {
      provide: FlightService,
      useFactory: (config) => {
        if (config.customer === 'a') {
          return new AdvancedFlightService();
        }
      },
      deps: [ConfigService]
    },
    { provide: BASE_URL, useValue: { key: 'default', url: 'http://my-default.com'}, multi: true },
    { provide: BASE_URL, useValue: { key: 'advanced', url: 'http://my-advanced.com'}, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
