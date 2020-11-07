import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {

  WeatherData:any;
  constructor() { }

  ngOnInit() {
    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.getWeatherData();
    console.log(this.WeatherData)
  }

  getWeatherData(){

  fetch('https://api.openweathermap.org/data/2.5/weather?q=Al Fayyum, EG&appid=ff1bc4683fc7325e9c57e586c20cc03e')
  .then(response=>response.json())
  .then(data=>{this.setWeatherData(data);})
    //convert my api string 
    // let data = JSON.parse('{"coord":{"lon":37.62,"lat":55.75},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"base":"stations","main":{"temp":287.2,"feels_like":279.97,"temp_min":282.59,"temp_max":294.61,"pressure":996,"humidity":33},"visibility":10000,"wind":{"speed":7.11,"deg":331},"clouds":{"all":47},"dt":1604742104,"sys":{"type":3,"id":50006341,"country":"RU","sunrise":1604724525,"sunset":1604756262},"timezone":10800,"id":524901,"name":"Moscow","cod":200}')
    // this.setWeatherData(data);

  }

  setWeatherData(data){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    // check if this is day or night time
    let currentDate = new Date();
    this.WeatherData.isDay = true//(currentDate.getTime() < sunsetTime.getTime())
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }

}
