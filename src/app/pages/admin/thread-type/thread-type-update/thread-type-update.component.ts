import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdateThreadTypeDtoReq } from 'src/app/dto/thread-type/update-thread-type-dto-req';
import { ThreadTypeService } from 'src/app/service/thread-type.service';

@Component({
  selector: 'app-thread-type-update',
  templateUrl: './thread-type-update.component.html',
  styleUrls: ['./thread-type-update.component.scss']
})
export class ThreadTypeUpdateComponent implements OnInit , OnDestroy{

  threadType: UpdateThreadTypeDtoReq = new UpdateThreadTypeDtoReq()

  getByIdSubscription? : Subscription
  updateSubscription? : Subscription
  activatedRouteSubscription? : Subscription

  constructor(private activatedRoute : ActivatedRoute, private router : Router, private threadTypeService : ThreadTypeService) { }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result=>{
      const id: string = (result as any).id
      this.getByIdSubscription = this.threadTypeService.getById(id).subscribe(result => {
        this.threadType = result.data
      })
    })
  }

  update(isValid : boolean) : void {
    if(isValid){
      this.updateSubscription = this.threadTypeService.update(this.threadType).subscribe(result => {
        if(result){
          this.router.navigateByUrl('/thread-type/list')
        }
      })
    }
  }
  ngOnDestroy(): void {
    this.getByIdSubscription?.unsubscribe()
    this.updateSubscription?.unsubscribe()
    this.activatedRouteSubscription?.unsubscribe()
  }
}
