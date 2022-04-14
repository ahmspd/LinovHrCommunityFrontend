import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, Subscription } from 'rxjs';
import { GetByIdThreadTypeDtoRes } from 'src/app/dto/thread-type/get-by-id-thread-type-dto-res';
import { UpdateThreadTypeDtoReq } from 'src/app/dto/thread-type/update-thread-type-dto-req';
import { UpdateThreadTypeDtoRes } from 'src/app/dto/thread-type/update-thread-type-dto-res';
import { ThreadTypeService } from 'src/app/service/thread-type.service';

@Component({
  selector: 'app-thread-type-update',
  templateUrl: './thread-type-update.component.html',
  styleUrls: ['./thread-type-update.component.scss']
})
export class ThreadTypeUpdateComponent implements OnInit{

  threadType: UpdateThreadTypeDtoReq = new UpdateThreadTypeDtoReq()
  threadTypeData : GetByIdThreadTypeDtoRes
  threadTypeUpdate : UpdateThreadTypeDtoRes

  idThreadType : string

  constructor(private activatedRoute : ActivatedRoute, private router : Router, private threadTypeService : ThreadTypeService) { }

  ngOnInit(): void {
    this.getData()
  }

  async getData() : Promise<void>{
    const result = await firstValueFrom(this.activatedRoute.params.pipe(map(result=>result)))
    this.idThreadType = (result as any).id
    this.threadTypeData = await firstValueFrom(this.threadTypeService.getById(this.idThreadType))
    this.threadType = this.threadTypeData.data
  }

  async update(isValid : boolean) : Promise<void> {
    if(isValid){
      this.threadTypeUpdate = await firstValueFrom(this.threadTypeService.update(this.threadType))
      if(this.threadTypeUpdate.data){
        this.router.navigateByUrl('/thread-type/list')
      }
    }
  }
}
