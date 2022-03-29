import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsertThreadTypeDtoReq } from 'src/app/dto/thread-type/insert-thread-type-dto-req';
import { ThreadTypeService } from 'src/app/service/thread-type.service';

@Component({
  selector: 'app-thread-type-new',
  templateUrl: './thread-type-new.component.html',
  styleUrls: ['./thread-type-new.component.scss']
})
export class ThreadTypeNewComponent implements OnInit , OnDestroy{

  threadType: InsertThreadTypeDtoReq = new InsertThreadTypeDtoReq()

  insertThreadTypeSubscription? : Subscription

  constructor(private router: Router, private threadTypeService : ThreadTypeService) { }

  ngOnInit(): void {
  }

  insert(isValid : boolean):void{
    if(isValid){
      this.insertThreadTypeSubscription = this.threadTypeService.insert(this.threadType).subscribe(result =>{
        if(result){
          this.router.navigateByUrl('/thread-type/list')
        }
      })
    }
  }
  ngOnDestroy(): void {
    this.insertThreadTypeSubscription?.unsubscribe()
  }
}
