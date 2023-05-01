import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';


@Component({
  selector: 'Dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {

  constructor(private WeatherService: WeatherService, private router: Router) {
  }

  public Lat: any;
  public Long: any;
  public Weather: any = [];
  public RecentlySearched: any = [];
  public viewSunny: boolean = false;
  public viewRain: boolean = false;
  public viewCloud: boolean = false;
  public loading = false;

  ngOnInit(): void {
    this.getCurrentLocation();
    this.checkChanges();
  }

  checkChanges() {
    setInterval(() => {
      this.RecentlySearched = JSON.parse(localStorage.getItem('data') || '[]');
      if (this.RecentlySearched.length > 5) {
        this.RecentlySearched.splice(0, 1);
        localStorage.setItem('data', JSON.stringify(this.RecentlySearched));
      }
    }, 1000)
  }

  getCurrentLocation() {
    this.loading = true;
    navigator.geolocation.getCurrentPosition((position) => {
      this.loading = false;
      let localLat = position.coords.latitude;
      let localLong = position.coords.longitude;
      this.getWeatherStatus(localLat, localLong);
    });
  }

  getWeatherStatus(lat: any, long: any) {

    this.loading = true;
    this.WeatherService.GetWeatherStatus(lat, long).subscribe((response) => {
      this.loading = false;
      this.syncToLocal(response);
      this.Weather = response;
      if (this.Weather) {
        if (this.Weather.weather[0].main === "Clear") {
          this.viewSunny = true;
          this.viewRain = false;
          this.viewCloud = false;
        }
        else if (this.Weather.weather[0].main === "Rain"|| this.Weather.weather[0].main==='Mist'||this.Weather.weather[0].main==='Thunderstorm'|| this.Weather.weather[0].main === 'Drizzle') {
          this.viewRain = true;
          this.viewSunny = false;
          this.viewCloud = false;
        }
        else if (this.Weather.weather[0].main === "Clouds"||this.Weather.weather[0].main==='Haze') {
          this.viewCloud = true;
          this.viewSunny = false;
          this.viewRain = false;
        }

        else {
          this.viewSunny = false;
          this.viewRain = false;
          this.viewCloud = false;
        }
      }
    }, (err) => {
      this.loading = false;
      console.log(err);
    })
  }



  syncToLocal(data: any) {
    let info = [];
    if (localStorage.getItem('data')) {
      info = JSON.parse(localStorage.getItem('data') || '[]');
      if (info.length > 0) {
        let temp = localStorage.getItem('data');
        if (temp?.includes(data.name)) {
        } else {
          if (info.length > 5) {
            info.splice(0, 1);
          }
          info.push(data);
        }
      }
    } else {
      info = [data];
    }
    localStorage.setItem('data', JSON.stringify(info))




  }

  getValues() {
    this.getWeatherStatus(this.Lat, this.Long);
  }
  navigateToPastDetails(name: any) {
    this.router.navigate(['/past-details', name]);
  }


}
