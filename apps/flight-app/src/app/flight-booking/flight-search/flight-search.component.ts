import {Component, Inject, OnInit} from '@angular/core';
import {FakeFlightService, FlightService} from '@flight-workspace/flight-lib';
import { BaseUrlType, BASE_URL } from '../../app.module';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  providers: [
    FlightService,
    { provide: BASE_URL, useValue: { key: 'default', url: 'http://my-default.com'} },
  ]
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  constructor(
    //private flightService: FlightService
    @Inject(BASE_URL) private baseUrl: BaseUrlType
  ) {
  }

  ngOnInit() {
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.flightService
      .load(this.from, this.to, this.urgent);
  }

  delay(): void {
    this.flightService.delay();
  }

}
