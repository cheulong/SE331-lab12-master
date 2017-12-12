import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Student} from "../service/student";
import {StudentsDataServerService} from "../service/students-data-server.service";

@Component({
  selector: 'app-tran-detail',
  templateUrl: './tran-detail.component.html',
  styleUrls: ['./tran-detail.component.css']
})
export class TranDetailComponent implements OnInit {
  student:Student;
  constructor(private route: ActivatedRoute, private studentDataService:StudentsDataServerService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params:Params) =>  this.studentDataService.getStudent(+params['id']))
      .subscribe((student:Student) => {
          if (student !== null)
            this.student = student;

        }
      );
  }


}
