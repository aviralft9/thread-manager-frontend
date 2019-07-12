import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-new-thread',
  templateUrl: './new-thread.component.html',
  styleUrls: ['./new-thread.component.css']
})
export class NewThreadComponent implements OnInit {
  newThreadForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  tagsArray:string[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
) { }

  ngOnInit() {
    this.newThreadForm = this.formBuilder.group({
      title: [''],
      description: [''],
      tags: ['']
  });
  }

  get f() { return this.newThreadForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.newThreadForm.invalid) {
        return;
    }
    this.tagsArray = this.f.tags.value.split(',');
    this.loading = true;
    this.userService.addNewThread(this.f.title.value, this.f.description.value, this.tagsArray);
    this.loading = false;
    this.router.navigate(['/threads']);
}


}
