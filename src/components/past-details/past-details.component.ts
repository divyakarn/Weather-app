import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-past-details',
  templateUrl: './past-details.component.html',
  styleUrls: ['./past-details.component.css']
})
export class PastDetailsComponent implements OnInit {
  
  public name:any;
  public Weather:any=[];
  public viewSunny:boolean = false;
  public viewRain:boolean = false;
  public viewCloud:boolean = false;
  constructor( private router: Router , private ActivatedRoute:ActivatedRoute) {

   }

  ngOnInit(): void {
    this.name= this.ActivatedRoute.snapshot.paramMap.get('name');
    console.log(this.name);
    // this.Weather = [];
    this.fetchFromLocal();
  }

  fetchFromLocal(){
    let temp = JSON.parse(localStorage.getItem('data')||'[]');
    console.log(temp);
    temp.forEach((item:any) => {
      if(item.name === this.name){
        console.log('found',item);
        this.Weather.push(item);
        if(this.Weather){
          console.log(this.Weather)
          if(this.Weather[0].weather[0].description === "clear sky"){
            this.viewSunny = true;
            this.viewRain = false;
            this.viewCloud = false;
          }
          if(this.Weather[0].weather[0].main === "Clouds" ||this.Weather[0].weather[0].main==="Haze"){
            this.viewCloud = true;
            this.viewSunny= false;
            this.viewRain = false;
           }
          if(this.Weather[0].weather[0].main === "Rain"||this.Weather[0].weather[0].main==='Mist' || this.Weather[0].weather[0].main==='Thunderstorm' || this.Weather[0].weatherp[0].main === 'Drizzle'){
            this.viewRain = true;
            this.viewSunny = false;
            this.viewCloud = false;
          }
         
          else{
            this.viewSunny = false;
            this.viewRain = false;
            this.viewCloud = false;
          }
        }
      }
      
    });

  }

  navigateToDashboard(){
    this.router.navigate(['/']);

  }


}
