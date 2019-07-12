import { AuthenticationService } from './../_services/authentication.service';
import { User } from './../_models/user';
import { Observable } from 'rxjs';
import { Thread } from './../_models/thread';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {
  user:User;
  owner:String;
  curUser: User;

  public threads: Thread[] = [];

  constructor(private httpClient: HttpClient,
    private userService: UserService, 
    private authSerivce:AuthenticationService)
    {
      this.authSerivce.currentUser.subscribe(x => this.user = x);
    }

  ngOnInit() {
    if(this.user){
      this.userService.getAllThreads().subscribe((data:any []) => {
        this.threads = data;
      });
      this.userService.getOwnerName().subscribe((data) => {
        this.curUser = data;
        this.owner = this.curUser.name;
      })
    }
    
  }

  

  
}
