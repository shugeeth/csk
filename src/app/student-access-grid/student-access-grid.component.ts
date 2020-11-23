import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { first } from 'rxjs/operators';
import { Students } from '../models/students';
import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-student-access-grid',
  templateUrl: './student-access-grid.component.html',
  styleUrls: ['./student-access-grid.component.css']
})
export class StudentAccessGridComponent implements OnInit {

  faCloudUploadAlt = faCloudUploadAlt;
  students:Students[];
  loading = false;
  isDirtyFlag = false;
  dbOutput: any;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private router: Router,
  ) {
    this.students = this.accountService.fellowValue.students;
   }

  ngOnInit(): void {
  }

  changeAccessCheckbox(i) {
    this.isDirtyFlag = true;
    if (this.students) {
      var check = !this.students[i].access;
      this.students[i].access = check;
      this.updateLocalStorage(this.students, i, check);
    }
  }

  updateLocalStorage(students: Students[], i: number, check: boolean){
    // const user = { ...this.userValue, ...params };
    var fellowFromLocalStorage = JSON.parse(localStorage.getItem("fellow"));
    fellowFromLocalStorage.students[i].access = check;
    localStorage.setItem("fellow",JSON.stringify(fellowFromLocalStorage));
  }

  onAccessFormSubmit(){

    this.loading = true;
    // reset alerts on submit
    this.alertService.clear();

    this.accountService.updateStudentAccess()
      .pipe(first())
      .subscribe(
          data => {
            this.dbOutput = data;
            this.alertService.success(this.dbOutput.message);
            this.loading = false;
            this.isDirtyFlag = false;
            this.router.navigate(['/']);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
              this.isDirtyFlag = false;
          },
          () => { //Operations to be done at final (no matter data or error)
            window.scroll(0,0);
          }
      );
  }

}
