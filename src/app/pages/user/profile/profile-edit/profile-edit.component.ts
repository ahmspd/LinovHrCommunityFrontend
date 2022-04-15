import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { GetAllCityDtoDataRes } from 'src/app/dto/city/get-all-city-dto-data-res';
import { GetAllCityDtoRes } from 'src/app/dto/city/get-all-city-dto-res';
import { GetAllIndustryDtoDataRes } from 'src/app/dto/industry/get-all-industry-dto-data-res';
import { GetAllIndustryDtoRes } from 'src/app/dto/industry/get-all-industry-dto-res';
import { GetAllPositionDtoDataRes } from 'src/app/dto/position/get-all-position-dto-data-res';
import { GetAllPositionDtoRes } from 'src/app/dto/position/get-all-position-dto-res';
import { GetAllProvinceDtoDataRes } from 'src/app/dto/province/get-all-province-dto-data-res';
import { GetAllProvinceDtoRes } from 'src/app/dto/province/get-all-province-dto-res';
import { GetUserDtoDataRes } from 'src/app/dto/user/get-user-dto-data-res';
import { GetUserDtoRes } from 'src/app/dto/user/get-user-dto-res';
import { UpdateUserDtoRes } from 'src/app/dto/user/update-user-dto-res';
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
export class ProfileEditComponent implements OnInit {

  userData : GetUserDtoDataRes = new GetUserDtoDataRes()
  users : GetUserDtoRes
  industryData : GetAllIndustryDtoDataRes[]=[]
  industry : GetAllIndustryDtoRes
  positionData : GetAllPositionDtoDataRes[]=[]
  position : GetAllPositionDtoRes
  cityData : GetAllCityDtoDataRes[]=[]
  city : GetAllCityDtoRes
  provinceData : GetAllProvinceDtoDataRes[]=[]
  province: GetAllProvinceDtoRes
  updateUser : UpdateUserDtoRes
  idUser : string
  file: File
  edit: boolean = false

  constructor(public router : Router, private userService:UserService, private loginService:LoginService,private industryService : IndustryService,
    private positionService : PositionService, private cityService : CityService, private provinceService : ProvinceService) { }


  ngOnInit(): void {
    this.idUser = this.loginService.getData().data.id
    this.getData()
  }

  async getData():Promise<void>{
    this.industry = await firstValueFrom(this.industryService.getAllIndustry())
    this.industryData = this.industry.data
    this.position = await firstValueFrom(this.positionService.getAllPosition())
    this.positionData = this.position.data
    this.city = await firstValueFrom(this.cityService.getAllCity())
    this.cityData = this.city.data
    this.province = await firstValueFrom(this.provinceService.getAllProvince())
    this.provinceData = this.province.data
    this.users = await firstValueFrom(this.userService.getById(this.idUser))
    this.userData = this.users.data
  }

  toLogout(){
    this.loginService.clearData()
    this.router.navigateByUrl("/login")
  }

  async update():Promise<void>{
    this.updateUser = await firstValueFrom(this.userService.updateProfile(this.userData, this.file))
    if(this.updateUser.data){
      this.getData()
    }
  }

  changeFile(event: any): void {
    this.file = event[0]
  }

  doEdit(): void {
    this.edit = true
    this.getData()
  }
  
  cancelEdit(): void {
    this.edit = false
    this.getData()
  }
}
