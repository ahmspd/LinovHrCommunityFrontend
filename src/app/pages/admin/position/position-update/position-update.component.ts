import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { GetByIdPositionDtoRes } from 'src/app/dto/position/get-by-id-position-dto-res';
import { UpdatePositionDtoReq } from 'src/app/dto/position/update-position-dto-req';
import { UpdatePositionDtoRes } from 'src/app/dto/position/update-position-dto-res';
import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-position-update',
  templateUrl: './position-update.component.html',
  styleUrls: ['./position-update.component.scss']
})
export class PositionUpdateComponent implements OnInit {

  position: UpdatePositionDtoReq = new UpdatePositionDtoReq()
  positionData : GetByIdPositionDtoRes
  positionUpdate : UpdatePositionDtoRes

  idPosition : string
  constructor(private positionService: PositionService, private activatedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    this.getData()
  }

  async getData() : Promise<void>{
    const result = await firstValueFrom(this.activatedRoute.params.pipe(map(result=>result)))
    this.idPosition = (result as any).id
    this.positionData = await firstValueFrom(this.positionService.getById(this.idPosition))
    this.position = this.positionData.data
  }

  async update(isValid: boolean): Promise<void> {
    if(isValid){
      this.positionUpdate = await firstValueFrom(this.positionService.update(this.position))
      if(this.positionUpdate.data){
        this.router.navigateByUrl('/position/list')
      }
    }
  }

}
