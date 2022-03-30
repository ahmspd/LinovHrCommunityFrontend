import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdatePositionDtoReq } from 'src/app/dto/position/update-position-dto-req';
import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-position-update',
  templateUrl: './position-update.component.html',
  styleUrls: ['./position-update.component.scss']
})
export class PositionUpdateComponent implements OnInit , OnDestroy{

  position: UpdatePositionDtoReq = new UpdatePositionDtoReq()
  positionSubsGetById?: Subscription
  positionSubsUpdate?: Subscription

  constructor(private positionService: PositionService, private activatedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(result => {
      const id: string = (result as any).id
      this.positionSubsGetById = this.positionService.getById(id).subscribe(result => {
        this.position = result.data
      })
    })
  }

  update(isValid: boolean): void {
    if(isValid){
      this.positionSubsUpdate = this.positionService.update(this.position).subscribe(result => {
        this.router.navigateByUrl('/position/list')
      })
    }
  }

  ngOnDestroy(): void {
    this.positionSubsGetById?.unsubscribe()
    this.positionSubsUpdate?.unsubscribe()
  }

}
