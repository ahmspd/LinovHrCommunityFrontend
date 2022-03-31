import { Component, OnInit } from '@angular/core';
import * as ClassicEditor  from 'src/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.scss']
})
export class ThreadDetailComponent implements OnInit {
  editor : any = ClassicEditor; 
  data : string = '';

  constructor() { }

  ngOnInit(): void {
  }

  likeClick(){

  }

  bookmarkClick(){

  }

  commentClick(){
    
  }

}
