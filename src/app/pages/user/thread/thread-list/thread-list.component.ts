import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  toThreadDetail(){
    this.router.navigateByUrl('/thread/detail')
  }

}
