import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsertPositionDtoReq } from 'src/app/dto/position/insert-position-dto-req';
import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-position-new',
  templateUrl: './position-new.component.html',
  styleUrls: ['./position-new.component.scss']
})
export class PositionNewComponent implements OnInit , OnDestroy{

  position: InsertPositionDtoReq = new InsertPositionDtoReq()

  insertSubscription? : Subscription
  constructor(private positionService: PositionService, private router: Router) { }

  ngOnInit(): void {
  }

  insert(isValid: boolean): void {
    if(isValid){
      this.insertSubscription = this.positionService.insert(this.position).subscribe(result => {
        console.log(result)
        this.router.navigateByUrl('/position/list')
      })
    }
  }

  ngOnDestroy(): void {
    this.insertSubscription?.unsubscribe()
  }
}
