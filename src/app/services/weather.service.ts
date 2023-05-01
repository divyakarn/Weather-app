
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

constructor(public http: HttpClient) { }
public GetWeatherStatus = (lat:any,long:any):Observable<any>=>{
  const url :string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b329c63007373e186569abf8dbe3f662`;
  return this.http.get<any>(url);
}




}
