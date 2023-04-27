import { Component, Input, OnInit } from '@angular/core';
import { IWeatherCard, IWeatherDaily } from '../../models/weather';

@Component({
  selector: 'app-weather-daily',
  templateUrl: './weather-daily.component.html',
  styleUrls: ['./weather-daily.component.css'],
})
export class WeatherDailyComponent implements OnInit {
  @Input() weatherInfoDaily: IWeatherDaily;

  weatherCards = new Array<IWeatherCard>;

  initCards(): void {
    for (let i = 0; i < this.weatherInfoDaily.timelines.daily.length; i++) {
      let card = {} as IWeatherCard;

      card.dayDate = this.weatherInfoDaily.timelines.daily[i].time;
      card.maxTemp =
        this.weatherInfoDaily.timelines.daily[i].values.temperatureApparentMax;
      card.minTemp =
        this.weatherInfoDaily.timelines.daily[i].values.temperatureApparentMin;

      this.weatherCards.push(card);
    }
  }

  ngOnInit(): void {
    this.initCards();
    console.log(this.weatherCards)

  }
}
