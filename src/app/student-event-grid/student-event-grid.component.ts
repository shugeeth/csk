import { AfterViewInit, Component, OnInit } from '@angular/core';
import { studentEventGrid } from "../core/models/student-events-info.model";
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { AccountService, AlertService } from '../services';
import { Fellow } from '../models';
import { Students } from '../models/students';
import { Events } from '../models/events';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { StudentsEventsMap } from '../models/students_events_map';

@Component({
  selector: 'app-student-event-grid',
  templateUrl: './student-event-grid.component.html',
  styleUrls: ['./student-event-grid.component.css']
})
export class StudentEventGridComponent implements OnInit, AfterViewInit {

  fellow: Fellow;
  events: Events[];
  faCloudUploadAlt = faCloudUploadAlt;
  dbOutput: any;
  loading = false;
  updateConfirmCheckFlag = false;
  selectedWeek: any;
  selectedMode: any;
  filteredStudents: Students[];
  filteredEvents: Events[];
  studentEventMap: any;
  // studentEventMap: { week: any; mode: any; student_id: number; event_id: number; flag: string }[];

  updationDetails: studentEventGrid[] = [];
  deletionDetails: studentEventGrid[] = [];

  weeks = [
    { display: "Week 1", value: "28-11-2020" },
    { display: "Week 2", value:"05-12-2020" },
    { display: "Week 3",value:"12-12-2020" },
    { display: "Week 4" ,value:"19-12-2020"}
  ];

  modes = [
    { value: "ONLINE" },
    { value: "CONFERENCE CALL" },
    { value: "OFFLINE" }
  ];

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private router: Router
  ){
    this.fellow = this.accountService.fellowValue;
    this.events = this.fellow.events;
    this.selectedMode = "ONLINE";
    this.selectedWeek = "28-11-2020";
    this.getStudentsFiltered();
    this.getEventsFiltered();
    this.studentEventMap = this.accountService.fellowValue.students_events_map;

    //Add a flag field to the studentEventMap
    //studentEventMap flag will initially be 'none'and will change to 'insert'/'delete' for update in localstorage and DB
    this.studentEventMap.forEach((semap) => {
      semap.flag = "none";
    })

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.filteredStudents.forEach((student) => {
      this.filteredEvents.forEach((event) => {
        this.mapCheckboxCheckedProperty(student.student_id, event.event_id)
      })
    })
  }

  getEventsFiltered(){
    this.filteredEvents = this.events.filter((event) => {
      return event.event_date == this.selectedWeek &&
      event.mode == this.selectedMode;
    });
  }

  getStudentsFiltered(){ //Check access flag if Mode is ONLINE
    if(this.selectedMode == "ONLINE"){
      this.filteredStudents =  this.fellow.students.filter(x=>x.access == true)
    }else{
      this.filteredStudents = this.fellow.students;
    }
  }

  onWeekChange(){
    this.getEventsFiltered()
    //console.log(this.filteredEvents);
  }

  onModeChange(){
    this.getStudentsFiltered();
    this.getEventsFiltered();
    //console.log(this.filteredEvents);
  }

  mapCheckboxCheckedProperty(studentId: number, eventId: number){
    var record = this.studentEventMap.filter((x: any)=>{
      return (x.week == this.selectedWeek &&
             x.mode == this.selectedMode &&
             x.student_id == studentId &&
             x.event_id == eventId)
    });
    if(record.length>0)
      return true;
    else
      return false;
  }

  onMapCheckboxChange(studentId: number, eventId: number, event: any){
    //studentEventMap: { week: any; mode: any; student_id: number; event_id: number; flag: string }[]
    // Find index of student when there is a change in checkbox
    var stuIndex = this.studentEventMap.findIndex(x => {
      return x.student_id == studentId &&
              x.event_id == eventId &&
              x.mode == this.selectedMode &&
              x.week == this.selectedWeek
    });

    if(event.target.checked){ //if the chcekbox was turned from false to true
      if(stuIndex!=-1){  //Logic if record in instudentEventMap
        if(this.studentEventMap[stuIndex].flag=="none"){
          this.studentEventMap[stuIndex].flag="insert";
        }else if(this.studentEventMap[stuIndex].flag=="delete"){
          this.studentEventMap[stuIndex].flag="none";
        }
      }
      else{
        this.studentEventMap.push({
          week: this.selectedWeek,
          mode: this.selectedMode,
          student_id: studentId,
          event_id: eventId,
          flag: "insert"
        });
      }
    }
    else{//if the checkbox was turned from true to false
      if(stuIndex!=-1){  //Logic if record in instudentEventMap
        if(this.studentEventMap[stuIndex].flag=="none"){
          this.studentEventMap[stuIndex].flag="delete";
        }else if(this.studentEventMap[stuIndex].flag=="insert"){
          //Check if record is there in local storage
          var seMapIndex = JSON.parse(localStorage.getItem("fellow")).students_events_map.findIndex(x => {
            return x.student_id == studentId &&
                    x.event_id == eventId &&
                    x.mode == this.selectedMode &&
                    x.week == this.selectedWeek
          });

          if(seMapIndex!=-1){ //if record in Local Storage
            this.studentEventMap[stuIndex].flag="delete";
          }
          else{
            //Remove current record from the StudentEventMap
            this.studentEventMap.splice(stuIndex,1);
          }
        }
      }
    }
    console.dir(this.studentEventMap);
  }


  onConfirmCheckboxChange(){
    this.updateConfirmCheckFlag = !this.updateConfirmCheckFlag;
  }

  onStuEventFormSubmit(){

    this.loading = true;
    // reset alerts on submit
    this.alertService.clear();


    // this.accountService.updateStudentEvent()
    // .pipe(first())
    // .subscribe(
    //     data => {
    //       this.dbOutput = data;
    //       this.alertService.success(this.dbOutput.message);
    //       this.loading = false;
    //       this.router.navigate(['/']);
    //     },
    //     error => {
    //         this.alertService.error(error);
    //         this.loading = false;
    //     }
    // );
  }

}
