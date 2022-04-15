import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, Subscription } from 'rxjs';
import { DeleteBookmarkDtoRes } from 'src/app/dto/bookmark/delete-bookmark-dto-res';
import { GetBookmarkThreadDtoDataRes } from 'src/app/dto/bookmark/get-bookmark-thread-dto-data-res';
import { GetBookmarkThreadDtoRes } from 'src/app/dto/bookmark/get-bookmark-thread-dto-res';
import { InsertBookmarkDtoReq } from 'src/app/dto/bookmark/insert-bookmark-dto-req';
import { InsertBookmarkDtoRes } from 'src/app/dto/bookmark/insert-bookmark-dto-res';
import { GetAllEventCourseDtoDataRes } from 'src/app/dto/event-course/get-all-event-course-dto-data-res';
import { GetAllEventCourseDtoRes } from 'src/app/dto/event-course/get-all-event-course-dto-res';
import { DeleteLikeDtoRes } from 'src/app/dto/like/delete-like-dto-res';
import { GetLikeThreadDtoDataRes } from 'src/app/dto/like/get-like-thread-dto-data-res';
import { GetLikeThreadDtoRes } from 'src/app/dto/like/get-like-thread-dto-res';
import { InsertLikeDtoReq } from 'src/app/dto/like/insert-like-dto-req';
import { InsertLikeDtoRes } from 'src/app/dto/like/insert-like-dto-res';
import { GetCountPollingVoteDtoRes } from 'src/app/dto/polling-detail-vote/get-count-polling-vote-dto-res';
import { GetPollingDtoDataRes } from 'src/app/dto/polling-detail-vote/get-polling-dto-data-res';
import { GetPollingDtoRes } from 'src/app/dto/polling-detail-vote/get-polling-dto-res';
import { InsertPollingVoteDtoReq } from 'src/app/dto/polling-detail-vote/insert-polling-vote-dto-req';
import { InsertPollingVoteDtoRes } from 'src/app/dto/polling-detail-vote/insert-polling-vote-dto-res';
import { GetPollingDetailByPollingIdDto } from 'src/app/dto/polling-detail/get-polling-detail-by-polling-id-dto';
import { InsertPollingDetailDtoReq } from 'src/app/dto/polling-detail/insert-polling-detail-dto-req';
import { InsertThreadDetailDtoReq } from 'src/app/dto/thread-detail/insert-thread-detail-dto-req';
import { InsertThreadDetailDtoRes } from 'src/app/dto/thread-detail/insert-thread-detail-dto-res';
import { GetAllThreadPageDtoRes } from 'src/app/dto/thread/get-all-thread-page-dto-res';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { GetThreadDetailDtoRes } from 'src/app/dto/thread/get-thread-detail-dto-res';
import { BookmarkService } from 'src/app/service/bookmark.service';
import { EventCourseService } from 'src/app/service/event-course.service';
import { LikeService } from 'src/app/service/like.service';
import { LoginService } from 'src/app/service/login.service';
import { PollingDetailVoteService } from 'src/app/service/polling-detail-vote.service';
import { ThreadService } from 'src/app/service/thread.service';
import * as ClassicEditor from 'src/ckeditor5/build/ckeditor';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.scss'],
  providers: [ConfirmationService]
})
export class ThreadDetailComponent implements OnInit {
  editor: any = ClassicEditor;
  data: string = '';
  showComment: boolean = false

  events: GetAllEventCourseDtoDataRes[] = []
  courses: GetAllEventCourseDtoDataRes[] = []
  dataArticle: GetThreadDataDtoRes[] = []
  eventData: GetAllEventCourseDtoRes
  courseData: GetAllEventCourseDtoRes
  article: GetAllThreadPageDtoRes

  threadDetailData: GetThreadDataDtoRes = new GetThreadDataDtoRes()
  threadCommentData: InsertThreadDetailDtoReq = new InsertThreadDetailDtoReq()
  idThread: string
  likeData: GetLikeThreadDtoDataRes = new GetLikeThreadDtoDataRes()
  bookmarkData: GetBookmarkThreadDtoDataRes = new GetBookmarkThreadDtoDataRes()
  voteData: GetCountPollingVoteDtoRes = new GetCountPollingVoteDtoRes()

  addLike: InsertLikeDtoReq = new InsertLikeDtoReq()
  addBookmar: InsertBookmarkDtoReq = new InsertBookmarkDtoReq()
  addVote: InsertPollingVoteDtoReq = new InsertPollingVoteDtoReq()
  dataVote: GetPollingDtoDataRes = new GetPollingDtoDataRes()

  dataPolling: GetPollingDtoRes
  dataDetailVote: GetCountPollingVoteDtoRes
  dataThread: GetThreadDetailDtoRes
  dataLike: GetLikeThreadDtoRes
  dataBookmark: GetBookmarkThreadDtoRes
  dataInsertComment : InsertThreadDetailDtoRes
  dataInsertPolling : InsertPollingVoteDtoRes
  dataInsertLike : InsertLikeDtoRes
  dataInsertBookmark : InsertBookmarkDtoRes
  dataDeleteLike : DeleteLikeDtoRes
  dataDeleteBookmark  : DeleteBookmarkDtoRes

  labelLike: string = "pi pi-heart mr-3"
  labelBookmark: string = "pi pi-bookmark mr-3"
  idLike: string
  idBookmark: string
  voteStatus: boolean = true
  idType: string = '2'
  idUser? : string

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private threadService: ThreadService, private loginService: LoginService, private confirmationService: ConfirmationService,
    private likeService: LikeService, private bookmarkService: BookmarkService, private pollingDetailVoteService: PollingDetailVoteService, private eventCourseService: EventCourseService) { }

  ngOnInit(): void {
    this.initData()
    this.getIdThread()
    if (this.loginService.getData() != null) {
      this.showComment = true
      this.getDataLike()
      this.getDataBookmark()
    }
    this.threadCommentData.contents = ''
  }

  async initData(): Promise<void> {
    this.article = await firstValueFrom(this.threadService.getArticleActiveWithPage(this.idType, 0, 2, true))
    this.dataArticle = this.article.data
    this.eventData = await firstValueFrom(this.eventCourseService.getActiveEventCourse('Event', this.idUser))
    this.events = this.eventData.data
    this.courseData = await firstValueFrom(this.eventCourseService.getActiveEventCourse('Course', this.idUser))
    this.courses = this.courseData.data
  }

  async getIdThread(): Promise<void> {
    const result = await firstValueFrom(this.activatedRoute.params.pipe(map(result => result)))
    this.idThread = (result as any).id
    this.getData()
  }

  async cekVote(): Promise<void> {
    const dataVote: GetPollingDetailByPollingIdDto[] = this.threadDetailData.dataThreadPolling
    if (dataVote) {
      for (let i = 0; i < dataVote.length; i++) {
        this.dataPolling = await firstValueFrom(this.pollingDetailVoteService.getVote(this.loginService.getData().data.id, dataVote[i].id))
        if (this.dataPolling.data.id != null) {
          this.voteStatus = false
          this.dataDetailVote = await firstValueFrom(this.pollingDetailVoteService.getDetailVote(this.threadDetailData.idPolling))
          if (this.dataDetailVote.data) {
            this.voteData = this.dataDetailVote
          }
        }
      }
    }
  }

  async getData(): Promise<void> {
    this.dataThread = await firstValueFrom(this.threadService.getThreadDetail(this.idThread))
    if (this.dataThread.data) {
      this.threadDetailData = this.dataThread.data
      if (this.loginService.getData() != null) {
        this.cekVote()
      }
    }
  }

  async getDataLike(): Promise<void> {
    if (this.loginService.getData() != null) {
      this.dataLike = await firstValueFrom(this.likeService.getLike(this.loginService.getData().data.id, this.idThread))
      this.likeData = this.dataLike.data
      if (this.likeData != null) {
        this.labelLike = "pi pi-heart-fill mr-3"
        this.idLike = this.likeData.idLike
      }
      else {
        this.labelLike = "pi pi-heart mr-3"
        this.idLike = ''
      }
    }
  }

  async getDataBookmark(): Promise<void> {
    if (this.loginService.getData() != null) {
      this.dataBookmark = await firstValueFrom(this.bookmarkService.getBookmark(this.loginService.getData().data.id, this.idThread))
      this.bookmarkData = this.dataBookmark.data
      if (this.bookmarkData != null) {
        this.labelBookmark = "pi pi-bookmark-fill mr-3"
        this.idBookmark = this.bookmarkData.idBookmark
      }
      else {
        this.labelBookmark = "pi pi-bookmark mr-3"
        this.idBookmark = ''
      }
    }
  }

  async doComment(isValid: boolean) : Promise<void> {
    if (isValid) {
      this.threadCommentData.idThread = this.idThread
      this.dataInsertComment = await firstValueFrom(this.threadService.insertComment(this.threadCommentData))
      if(this.dataInsertComment.data){
        this.getData()
        this.threadCommentData.contents = ''
      }
    }
  }

  async doVote(id: string): Promise<void> {
    if (this.loginService.getData() != null) {
      this.addVote.idPollingDetail = id
      this.dataInsertPolling = await firstValueFrom(this.pollingDetailVoteService.insert(this.addVote))
      if(this.dataInsertPolling.data){
        this.getData()
      }
    }
    else {
      this.router.navigateByUrl('/login')
    }
  }

  async likeClick() : Promise<void> {
    if (this.loginService.getData() != null) {
      if (this.labelLike.match("pi pi-heart mr-3")) {
        this.addLike.idThread = this.idThread
        this.dataInsertLike = await firstValueFrom(this.likeService.insert(this.addLike))
        if(this.dataInsertLike.data){
          this.getDataLike()
          this.getData()
        }
      }
      else {
        this.dataDeleteLike = await firstValueFrom(this.likeService.deleteById(this.idLike))
        if(this.dataDeleteLike){
          this.getDataLike()
          this.getData()
        }
      }
    }
    else {
      this.router.navigateByUrl('/login')
    }
  }

  async bookmarkClick() : Promise<void>{
    if (this.loginService.getData() != null) {
      if (this.labelBookmark.match("pi pi-bookmark mr-3")) {
        this.addBookmar.idThread = this.idThread
        this.dataInsertBookmark = await firstValueFrom(this.bookmarkService.insert(this.addBookmar))
        if(this.dataInsertBookmark){
          this.getDataBookmark()
          this.getData()
        }
      }
      else {
        this.dataDeleteBookmark = await firstValueFrom(this.bookmarkService.deleteById(this.idBookmark))
        if(this.dataDeleteBookmark){
          this.getDataBookmark()
          this.getData()
        }
      }
    }
    else {
      this.router.navigateByUrl('/login')
    }
  }

  commentClick(): void {

  }

  dateFormatter(date: moment.MomentInput): String {
    return moment(date).format('ddd, DD MMM')
  }

  timeFormatter(time: String): String {
    return time.substring(0, 5)
  }

  priceFormatter(price: any): String {
    return `Rp.${price}`
  }

  join(event: String, idEvent: String) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to join ${event} ?`,
      header: 'Confirmation',
      icon: 'pi pi-check-circle',
      accept: () => {
        this.router.navigateByUrl(`/event-course/join/${idEvent}`)
      },
      reject: () => {
        this.initData()
      }
    });
  }
}
