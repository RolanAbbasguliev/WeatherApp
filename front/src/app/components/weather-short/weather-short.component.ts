import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IWeatherToday } from '../../models/weather';
@Component({
  selector: 'app-weather-short',
  templateUrl: './weather-short.component.html',
  styleUrls: ['./weather-short.component.css'],
})
export class WeatherShortComponent {
  @Input() weatherInfo: IWeatherToday;

  locationInputText: string;

  @Output() outLocation = new EventEmitter<string>();

  update() {
    this.outLocation.emit(this.locationInputText);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes.locationInputText);
  //   this.update();
  // }

  // ngOnChanges(changes: string): void {
  //   console.log(changes)
  //   if (changes !== undefined) {
  //     this.outLocation.emit(this.locationInputText)

  //   }
  // }
}
