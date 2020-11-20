import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

  changePswdForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  output: any;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private alertService: AlertService
  ) {

  }

  ngOnInit() {

    this.changePswdForm = this.formBuilder.group({
        password1: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  // convenience getter for easy access to form fields
  get f() { return this.changePswdForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.changePswdForm.invalid) {
      return;
    }

    if(this.f.password1.value!=this.f.password2.value){
      this.alertService.error("Password Mismatch Error");
      return;
    }

    this.loading = true;
    this.accountService.changePassword(this.f.password1.value)
    .pipe(first())
    .subscribe(data => {
          this.output = data;
          this.alertService.success(this.output.message);
          //this.router.navigate([this.returnUrl]);
          this.changePswdForm.reset();
          this.submitted = false;
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.changePswdForm.reset();
          this.submitted = false;
          this.loading = false;
        }
    );
  }
}
