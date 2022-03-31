import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as ClassicEditor  from 'src/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-thread-save',
  templateUrl: './thread-save.component.html',
  styleUrls: ['./thread-save.component.scss']
})
export class ThreadSaveComponent implements OnInit {
  editor : any = ClassicEditor; 
  data : string = '';
  isPremium: boolean = false;
  isPolling: boolean = false;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  onCreate(isValid: boolean): void {
    if (isValid) {
      // this.loginService.login(this.login).subscribe(result => {
      //   console.log(result)
      //   this.loginService.saveData(result)
        this.router.navigateByUrl('/dashboard')
      // })
    }
  }

}
