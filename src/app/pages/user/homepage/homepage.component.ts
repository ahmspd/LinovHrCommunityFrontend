import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit , OnDestroy{

  articleData : GetThreadDataDtoRes[]=[]
  threadData : GetThreadDataDtoRes[]=[]

  //Subscription
  getArticleSubscription? : Subscription
  getThreadSubscription? : Subscription

  isPremium:boolean = false

  constructor(public router : Router, private threadService : ThreadService, private loginService : LoginService) { }

  ngOnInit(): void {
    this.getArticleSubscription = this.threadService.getThreadByType('2').subscribe(result=>{
      this.articleData = result.data
    })
    this.getThreadSubscription = this.threadService.getThread().subscribe(result=>{
      this.threadData = result.data
    })
    if(this.loginService!=null){
      this.isPremium = this.loginService.getData().data.isMember
    }
  }

  toThread(){
    this.router.navigateByUrl('/thread/list')
  }

  articleDetail(id:number):void{
    this.router.navigateByUrl(`/user/article/${id}`)
  }
  threadDetail(id:number):void{
    this.router.navigateByUrl(`/thread/${id}`)
  }
  
  ngOnDestroy(): void {
    this.getArticleSubscription?.unsubscribe()
    this.getThreadSubscription?.unsubscribe()
  }
}
