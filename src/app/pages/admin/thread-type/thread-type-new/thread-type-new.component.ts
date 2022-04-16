import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { InsertThreadTypeDtoReq } from 'src/app/dto/thread-type/insert-thread-type-dto-req';
import { InsertThreadTypeDtoRes } from 'src/app/dto/thread-type/insert-thread-type-dto-res';
import { ThreadTypeService } from 'src/app/service/thread-type.service';

@Component({
  selector: 'app-thread-type-new',
  templateUrl: './thread-type-new.component.html',
  styleUrls: ['./thread-type-new.component.scss']
})
export class ThreadTypeNewComponent implements OnInit{

  threadType: InsertThreadTypeDtoReq = new InsertThreadTypeDtoReq()
  threadTypeData : InsertThreadTypeDtoRes

  constructor(private router: Router, private threadTypeService : ThreadTypeService) { }

  ngOnInit(): void {
  }

  async insert(isValid : boolean): Promise<void>{
    if(isValid){
      this.threadTypeData = await firstValueFrom(this.threadTypeService.insert(this.threadType))
      if(this.threadTypeData.data){
        this.router.navigateByUrl('/thread-type/list')
      }
    }
  }
}
