import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCloudUploadAlt, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
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
  faHandPointRight = faHandPointRight;
  //Regex to have phone number empty, null or 10 digits only. \\d is used as it is matching a string
  phonePattern = new RegExp("^(\\d{10}|\\d{0}|null)$");
  updateConfirmCheckFlag = false;
  students: any[];
  updateRecordsToDB: any[] = [];
  loading = false;
  submitted = false;
  dbOutput: any;
  compact:boolean = false;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private router: Router,
  ) {
    this.students = this.accountService.fellowValue.students;
    //Add and update flag as none for all students
    this.setNoneFlagForAllStudents();
   }

  ngOnInit(): void {

  }

  setNoneFlagForAllStudents(){
    //Add a flag field to the studentEventMap
    this.students.forEach((student) => {
      student.flag = "none";
    })
  }

  checkForPattern(x): boolean{
    return this.phonePattern.test(x);
  }

  updateFlag(studentId: number) {
    // Find index of student when there is a change in checkbox
    var stuIndex = this.students.findIndex(x => {
      return x.student_id == studentId
    });

    if(stuIndex!=-1){
      if(this.students[stuIndex].flag=="none"){
        this.students[stuIndex].flag="update";
      }
    }
    else{
      this.alertService.error("Invalid Student Record");
    }
  }

  updateLocalStorage(){
    // const user = { ...this.userValue, ...params };
    var fellowFromLocalStorage = JSON.parse(localStorage.getItem("fellow"));
    this.updateRecordsToDB.forEach(element => {
      // Find index of student in Local Storage, where there is a change
      var stuIndex = fellowFromLocalStorage.students.findIndex(x => {
        return x.student_id == element.student_id
      });
      //Update record in local variable
      if(stuIndex!=-1){
        fellowFromLocalStorage.students[stuIndex].access = element.access;
        fellowFromLocalStorage.students[stuIndex].phone_number = element.phone_number;
      }
      else{
        this.alertService.error("Invalid Student Record");
        return;
      }
    })
    //Assign local variable to Local Storage
    localStorage.setItem("fellow",JSON.stringify(fellowFromLocalStorage));
  }

  onAccessFormSubmit(){

    // reset alerts on submit
    this.alertService.clear();

    this.loading = true;

    //Push records that needs to be updated
    this.students.forEach(element => {
      if(element.flag=="update"){
        this.updateRecordsToDB.push(
          Object.assign({}, element)
        )
      }
    });

    //Stop here if phone numbers is invalid in records to be updated to DB
    var phoneInvalidFlag = 0;
    this.updateRecordsToDB.forEach(element =>{
      if(this.checkForPattern(element.phone_number)){
        if(element.phone_number==""){ //Change phone_number to null if it is empty
          element.phone_number=null;
        }
      }
      else{
        phoneInvalidFlag = 1;
      }
    })
    if(phoneInvalidFlag) {
      this.alertService.error('Error in Phone Number Fields');
      this.updateRecordsToDB = [];
      this.loading = false;
      window.scroll(0,0);
      return;
    }

    //Remove flag property as it is unnecessary
    this.updateRecordsToDB = this.updateRecordsToDB.filter(x=>{
                                delete x.flag;
                                return true;
                              });

    if(!(this.updateRecordsToDB.length==0)){ //Dont call DB if both updateRecordsToDB array is empty
      this.accountService.updateStudentAccess(this.updateRecordsToDB)
      .pipe(first())
      .subscribe(
          data => {
            this.dbOutput = data;
            this.alertService.success(this.dbOutput.message);
            this.updateLocalStorage();
          },
          error => {
              this.alertService.error(error);
          },
          () => { //Operations to be done at final (no matter data or error)
            this.updateRecordsToDB = [];
            this.students = [];
            var fellowFromLocalStorage = JSON.parse(localStorage.getItem("fellow"));
            this.students = fellowFromLocalStorage.students;
            this.setNoneFlagForAllStudents();
            this.updateConfirmCheckFlag = false;
            this.loading = false;
            window.scroll(0,0);
          }
      );
    }
    else{
      this.alertService.error("No Change Detected. No Records Updated");
      this.updateConfirmCheckFlag = false;
      this.loading = false;
      window.scroll(0,0);
    }

  }

}
