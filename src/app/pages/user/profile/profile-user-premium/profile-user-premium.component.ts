import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-user-premium',
  templateUrl: './profile-user-premium.component.html',
  styleUrls: ['./profile-user-premium.component.scss']
})
export class ProfileUserPremiumComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  toEdit(){
    this.router.navigateByUrl("/user/setting/edit-profile")
  }

  toChangePass(){
    this.router.navigateByUrl("/user/setting/change-password")
  }

  toPremium(){
    this.router.navigateByUrl("/user/setting/premium")
  }

  toLogout(){
    this.router.navigateByUrl("/login")
  }

}
