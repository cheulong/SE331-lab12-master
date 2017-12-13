import { Component, OnInit } from '@angular/core';


import {Router} from "@angular/router";
import {StudentsDataServerService} from "../service/students-data-server.service";
import {Student} from "../service/student";
import {Observable} from "rxjs/Observable";



@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  value:any;
  students: Student[];
  search:string;
  constructor(private studentDataService: StudentsDataServerService, private router: Router ) {
  }

  ngOnInit() {
    this.studentDataService.getStudentsData()
      .subscribe(students => this.students = students);
  }
  showDetail(student: Student){
    this.router.navigate(['/tranDetail',student.id]);
  }
  onSearch(){

    this.studentDataService.findStudent(this.search,this.value)
      .subscribe(
        products=>this.students=products
      )
  }
}
