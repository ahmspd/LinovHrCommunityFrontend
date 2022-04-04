import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit, OnDestroy {

  threadData: GetThreadDataDtoRes[] = []

  //subscription
  getThreadSubscription?: Subscription

  constructor(private router: Router, private threadService: ThreadService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getThreadSubscription = this.threadService.getThread().subscribe(result => {
      this.threadData = result.data
    })
  }

  toThreadDetail(isPremium: boolean, id: string) {
    if (isPremium) {
      if (this.loginService.getData() != null) {
        if (this.loginService.getData().data.isMember) {
          this.router.navigateByUrl(`/thread/${id}`)
        }
        else {
          console.log("go member");
        }
      } 
      else {
        this.router.navigateByUrl(`/login`)
      }
    }
    else {
      this.router.navigateByUrl(`/thread/${id}`)
    }
  }

  likeClick() {

  }

  bookmarkClick() {

  }

  commentClick() {
  }

  ngOnDestroy(): void {
    this.getThreadSubscription?.unsubscribe()
  }
}
