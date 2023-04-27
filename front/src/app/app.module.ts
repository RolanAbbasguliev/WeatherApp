import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { WeatherDailyComponent } from './components/weather-daily/weather-daily.component';
import { WeatherHightlightsComponent } from './components/weather-hightlights/weather-hightlights.component';
import { WeatherShortComponent } from './components/weather-short/weather-short.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherShortComponent,
    WeatherCardComponent,
    WeatherDailyComponent,
    WeatherHightlightsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
