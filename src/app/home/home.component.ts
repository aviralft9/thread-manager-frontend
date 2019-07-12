import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currUser: User
  loaded = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getOwnerName().subscribe((data) => {
      this.currUser = data;
    });
    console.log(this.currUser);
    if(this.currUser != undefined){
      this.loaded = true;
    }else{
      this.loaded = false;
    }

  }

}
