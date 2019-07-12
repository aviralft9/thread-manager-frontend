import { Router } from '@angular/router';
import { User } from './../_models/user';
import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private currentUser:User;
  loggedIn = false;
  constructor( private authenticationService: AuthenticationService,private router:Router) 
  { this.authenticationService.currentUser.subscribe(x => this.currentUser = x); }

  ngOnInit() {
    
    if(localStorage.getItem('currentUser')){
      this.loggedIn = true;
    }
    this.authenticationService.getLoginSubscriber().subscribe((event)=>{
      this.loggedIn = true;
    });
    
  }

  handleLogout(){
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/login']);  
  }

}
