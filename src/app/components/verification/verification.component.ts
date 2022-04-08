import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { RegistrationCodeDtoReq } from 'src/app/dto/user/registration-code-dto-req';
import { GetUserByEmailDtoDataRes } from 'src/app/dto/user/get-user-by-email-dto-data-res';
import { GetUserDtoDataRes } from 'src/app/dto/user/get-user-dto-data-res';
import { UpdateUserDtoReq } from 'src/app/dto/user/update-user-dto-req';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
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
export class VerificationComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];

  password: string;
  confirmPassword: string;
  
  config: AppConfig;
  
  subscription: Subscription;
  activatedRouteSubscription? : Subscription
  getByIdSubscription? : Subscription
  updateSubscription? : Subscription

  idUser : string
  registrationCode : string
  userData : GetUserDtoDataRes = new GetUserDtoDataRes()
  userUpdate : UpdateUserDtoReq = new UpdateUserDtoReq()

  constructor(public configService: ConfigService, private router : Router, private activatedRoute : ActivatedRoute, 
              private userService : UserService){ }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result=> {
      this.idUser = (result as any).id
      this.getByIdSubscription = this.userService.getById(this.idUser).subscribe(result =>{
        this.userData = result.data
      })
    })
  }

  update(isValid : boolean) : void {
    if(isValid){
      // if(this.registrationCode === this.userData.registrationCode){
        this.userUpdate.id = this.idUser
        this.updateSubscription = this.userService.updateIsActive(this.userUpdate).subscribe(result => {
          if(result){
            this.router.navigateByUrl('/login')
          }
        })
      // }
    }
  }

  toLogin(){
    this.router.navigateByUrl('/login')
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    this.activatedRouteSubscription?.unsubscribe()
    this.getByIdSubscription?.unsubscribe()
    this.updateSubscription?.unsubscribe()
  }
}
