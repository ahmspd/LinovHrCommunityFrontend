import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetAllCityDtoDataRes } from 'src/app/dto/city/get-all-city-dto-data-res';
import { GetAllIndustryDtoDataRes } from 'src/app/dto/industry/get-all-industry-dto-data-res';
import { GetAllPositionDtoDataRes } from 'src/app/dto/position/get-all-position-dto-data-res';
import { GetAllProvinceDtoDataRes } from 'src/app/dto/province/get-all-province-dto-data-res';
import { GetUserDtoDataRes } from 'src/app/dto/user/get-user-dto-data-res';
import { CityService } from 'src/app/service/city.service';
import { IndustryService } from 'src/app/service/industry.service';
import { LoginService } from 'src/app/service/login.service';
import { PositionService } from 'src/app/service/position.service';
import { ProvinceService } from 'src/app/service/province.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit , OnDestroy{

  userData : GetUserDtoDataRes = new GetUserDtoDataRes()
  industryData : GetAllIndustryDtoDataRes[]=[]
  positionData : GetAllPositionDtoDataRes[]=[]
  cityData : GetAllCityDtoDataRes[]=[]
  provinceData : GetAllProvinceDtoDataRes[]=[]

  idUser : string

  //subscription
  getUserDataSubscription? : Subscription
  getIndustryDataSubscription? : Subscription
  getPositionDataSubscription? : Subscription
  getCityDataSubscription? : Subscription
  getProvinceDataSubscription? : Subscription
  updateUserSubscription? : Subscription

  constructor(public router : Router, private userService:UserService, private loginService:LoginService,private industryService : IndustryService,
    private positionService : PositionService, private cityService : CityService, private provinceService : ProvinceService) { }


  ngOnInit(): void {
    this.idUser = this.loginService.getData().data.id
    this.getData()
    this.getIndustryDataSubscription = this.industryService.getAllIndustry().subscribe(result => {
      this.industryData = result.data
    })
    this.getPositionDataSubscription = this.positionService.getAllPosition().subscribe(result => {
      this.positionData = result.data
    })
    this.getCityDataSubscription = this.cityService.getAllCity().subscribe(result=>{
      this.cityData = result.data
    })
    this.getProvinceDataSubscription = this.provinceService.getAllProvince().subscribe(result =>{
      this.provinceData = result.data
    })
  }

  getData():void{
    this.getUserDataSubscription = this.userService.getById(this.idUser).subscribe(result=>{
      this.userData = result.data
    })
  }

  toLogout(){
    this.loginService.clearData()
    this.router.navigateByUrl("/login")
  }

  update():void{
    this.updateUserSubscription = this.userService.updateProfile(this.userData).subscribe(result => {
      if(result.data){
        this.getData()
      }
    })
  }

  ngOnDestroy(): void {
    this.getUserDataSubscription?.unsubscribe()
    this.getIndustryDataSubscription?.unsubscribe()
    this.getPositionDataSubscription?.unsubscribe()
    this.getCityDataSubscription?.unsubscribe()
    this.getProvinceDataSubscription?.unsubscribe()
    this.updateUserSubscription?.unsubscribe()
  }
}
