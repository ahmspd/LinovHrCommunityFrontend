import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { InsertUserDtoReq } from 'src/app/dto/user/insert-user-dto-req';
import { GetAllIndustryDtoDataRes } from 'src/app/dto/industry/get-all-industry-dto-data-res';
import { IndustryService } from 'src/app/service/industry.service';
import { GetAllPositionDtoDataRes } from 'src/app/dto/position/get-all-position-dto-data-res';
import { PositionService } from 'src/app/service/position.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles:[`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class RegisterComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];

  password: string;
  confirmPassword: string;
  
  config: AppConfig;
  
  subscription: Subscription;
  getIndustryDataSubscription? : Subscription
  getPositionDataSubscription? : Subscription
  insertSubscription? : Subscription

  registerData : InsertUserDtoReq = new InsertUserDtoReq()
  industryData : GetAllIndustryDtoDataRes[]=[]
  positionData : GetAllPositionDtoDataRes[]=[]

  constructor(public configService: ConfigService, private router : Router, private industryService : IndustryService,
              private positionService : PositionService, private userService : UserService){ }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
    this.getIndustryDataSubscription = this.industryService.getAllIndustry().subscribe(result => {
      this.industryData = result.data
    })
    this.getPositionDataSubscription = this.positionService.getAllPosition().subscribe(result => {
      this.positionData = result.data
    })
  }

  toVerify(){
    this.router.navigateByUrl('/verification')
  }

  toLogin(){
    this.router.navigateByUrl('/login')
  }

  insert(isValid: boolean) : void {
    this.registerData.idRole = '2';
    this.insertSubscription = this.userService.insert(this.registerData).subscribe(result => {
      if(result){
        this.router.navigateByUrl(`/verification/${result.data.id}`)
      }
    })
  }
 
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    this.getIndustryDataSubscription?.unsubscribe()
    this.getPositionDataSubscription?.unsubscribe()
  }
}
