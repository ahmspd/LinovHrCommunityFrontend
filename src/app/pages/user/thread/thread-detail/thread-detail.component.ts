import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetBookmarkThreadDtoDataRes } from 'src/app/dto/bookmark/get-bookmark-thread-dto-data-res';
import { InsertBookmarkDtoReq } from 'src/app/dto/bookmark/insert-bookmark-dto-req';
import { GetLikeThreadDtoDataRes } from 'src/app/dto/like/get-like-thread-dto-data-res';
import { InsertLikeDtoReq } from 'src/app/dto/like/insert-like-dto-req';
import { InsertThreadDetailDtoReq } from 'src/app/dto/thread-detail/insert-thread-detail-dto-req';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { GetThreadDetailDtoRes } from 'src/app/dto/thread/get-thread-detail-dto-res';
import { BookmarkService } from 'src/app/service/bookmark.service';
import { LikeService } from 'src/app/service/like.service';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';
import * as ClassicEditor  from 'src/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.scss']
})
export class ThreadDetailComponent implements OnInit , OnDestroy{
  editor : any = ClassicEditor; 
  data : string = '';
  showComment : boolean = false

  threadDetailData : GetThreadDataDtoRes = new GetThreadDataDtoRes()
  threadCommentData : InsertThreadDetailDtoReq = new InsertThreadDetailDtoReq()
  idThread : string
  likeData : GetLikeThreadDtoDataRes = new GetLikeThreadDtoDataRes()
  bookmarkData : GetBookmarkThreadDtoDataRes = new GetBookmarkThreadDtoDataRes()

  addLike : InsertLikeDtoReq = new InsertLikeDtoReq()
  addBookmar : InsertBookmarkDtoReq = new InsertBookmarkDtoReq()
  //subscription
  getDataSubscription? : Subscription
  activatedRouteSubscription? : Subscription
  insertCommentSubscription? : Subscription
  getLikeSubscription? : Subscription
  insertLikeSubscription? : Subscription
  deleteLikeSubscription? : Subscription
  getBookmarkSubscription? : Subscription
  insertBookmarkSubscription? : Subscription
  deleteBookmarkSubscription? : Subscription

  labelLike : string = "pi pi-heart mr-3"
  labelBookmark : string = "pi pi-bookmark mr-3"
  idLike: string
  idBookmark : string

  constructor(private router : Router, private activatedRoute : ActivatedRoute, private threadService : ThreadService, private loginService : LoginService,
              private likeService : LikeService, private bookmarkService : BookmarkService) { }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result=>{
      this.idThread = (result as any).id
      this.getData()
    })
    if(this.loginService.getData()!=null){
      this.showComment = true
      this.getDataLike()
      this.getDataBookmark()
    }
    this.threadCommentData.contents = ''
  }

  getData(){
    this.getDataSubscription = this.threadService.getThreadDetail(this.idThread).subscribe(result=>{
      this.threadDetailData = result.data
    })
  }

  getDataLike(){
    if(this.loginService.getData()!=null){
      this.getLikeSubscription = this.likeService.getLike(this.loginService.getData().data.id, this.idThread).subscribe(result =>{
        this.likeData = result.data
        if(this.likeData != null){
          this.labelLike = "pi pi-heart-fill mr-3"
          this.idLike = this.likeData.idLike
        }
        else {
          this.labelLike = "pi pi-heart mr-3"
          this.idLike = ''
        }
      })
    }
  }

  getDataBookmark(){
    if(this.loginService.getData()!=null){
      this.getBookmarkSubscription = this.bookmarkService.getBookmark(this.loginService.getData().data.id, this.idThread).subscribe(result => {
        this.bookmarkData = result.data
        if(this.bookmarkData!=null){
          this.labelBookmark = "pi pi-bookmark-fill mr-3"
          this.idBookmark = this.bookmarkData.idBookmark
        }
        else {
          this.labelBookmark = "pi pi-bookmark mr-3"
          this.idBookmark = ''
        }
      })
    }
  }

  doComment(isValid:boolean){
    if(isValid){
      this.threadCommentData.idThread = this.idThread
      this.insertCommentSubscription = this.threadService.insertComment(this.threadCommentData).subscribe(result=>{
        if(result){
          this.getData()
          this.threadCommentData.contents = ''
        }
      })
    }
  }

  likeClick(){
    if(this.loginService.getData()!=null){
      if(this.labelLike.match("pi pi-heart mr-3")){
        this.addLike.idThread = this.idThread
        this.insertLikeSubscription = this.likeService.insert(this.addLike).subscribe(result => {
          if(result){
            this.getDataLike()
          }
        })
      }
      else {
        this.deleteLikeSubscription = this.likeService.deleteById(this.idLike).subscribe(result => {
          if(result){
            this.getDataLike()
          }
        })
      }
    }
    else {
      this.router.navigateByUrl('/login')
    }
  }

  bookmarkClick(){
    if(this.loginService.getData()!=null){
      if(this.labelBookmark.match("pi pi-bookmark mr-3")){
        this.addBookmar.idThread = this.idThread
        this.insertBookmarkSubscription = this.bookmarkService.insert(this.addBookmar).subscribe(result => {
          if(result){
            this.getDataBookmark()
          }
        })
      }
      else {
        this.deleteBookmarkSubscription = this.bookmarkService.deleteById(this.idBookmark).subscribe(result => {
          if(result){
            this.getDataBookmark()
          }
        })
      }
    }
    else {
      this.router.navigateByUrl('/login')
    }
  }

  commentClick(){
    
  }

  ngOnDestroy(): void {
    this.getDataSubscription?.unsubscribe()
    this.activatedRouteSubscription?.unsubscribe()
  }
}
