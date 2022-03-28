import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsertPositionDtoReq } from 'src/app/dto/position/insert-position-dto-req';
import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-position-new',
  templateUrl: './position-new.component.html',
  styleUrls: ['./position-new.component.scss']
})
export class PositionNewComponent implements OnInit {

  position: InsertPositionDtoReq = new InsertPositionDtoReq()

  constructor(private positionService: PositionService, private router: Router) { }

  ngOnInit(): void {
  }

  insert(isValid: boolean): void {
    if(isValid){
      this.positionService.insert(this.position).subscribe(result => {
        console.log(result)
        this.router.navigateByUrl('/position/list')
      })
    }
  }

}
