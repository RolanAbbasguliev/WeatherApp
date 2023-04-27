import { Component, Input, OnInit } from '@angular/core';
import { IWeatherCard } from '../../models/weather';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
})
export class WeatherCardComponent implements OnInit {
  @Input() weatherCard: IWeatherCard;

  ngOnInit(): void {
    console.log(this.weatherCard);
  }
}
