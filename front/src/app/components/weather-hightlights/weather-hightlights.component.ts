import { Component, Input } from '@angular/core';
import { IWeatherHightLights } from '../../models/weather';

@Component({
  selector: 'app-weather-hightlights',
  templateUrl: './weather-hightlights.component.html',
  styleUrls: ['./weather-hightlights.component.css'],
})
export class WeatherHightlightsComponent {
  @Input() weatherHightlights: IWeatherHightLights;
}
