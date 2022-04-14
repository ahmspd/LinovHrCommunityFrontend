import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { InsertBookmarkDtoRes } from 'src/app/dto/bookmark/insert-bookmark-dto-res';
import { InsertPositionDtoReq } from 'src/app/dto/position/insert-position-dto-req';
import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-position-new',
  templateUrl: './position-new.component.html',
  styleUrls: ['./position-new.component.scss']
})
export class PositionNewComponent implements OnInit{

  position: InsertPositionDtoReq = new InsertPositionDtoReq()
  positionData: InsertBookmarkDtoRes

  constructor(private positionService: PositionService, private router: Router) { }

  ngOnInit(): void {
  }

  async insert(isValid: boolean): Promise<void> {
    if(isValid){
      this.positionData = await firstValueFrom(this.positionService.insert(this.position))
      if(this.positionData.data){
        this.router.navigateByUrl('/position/list')
      }
    }
  }

}
