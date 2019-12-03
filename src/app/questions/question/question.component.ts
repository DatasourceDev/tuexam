import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  QuestionTypeID: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onChange(event: any, deviceValue: any) {
    if (deviceValue == '1')
      this.router.navigate(["/question-multi-choice/0"]);
    else if(deviceValue == '2')
      this.router.navigate(["/question-tf/0"]);
    else if (deviceValue == '3')
      this.router.navigate(["/question-multi-math/0"]);
    else if (deviceValue == '4')
      this.router.navigate(["/question-short-ans/0"]);
    else if (deviceValue == '5')
      this.router.navigate(["/question-eassy/0"]);
    else if (deviceValue == '6')
      this.router.navigate(["/question-assigment/0"]);
    else if (deviceValue == '7')
      this.router.navigate(["/question-read-text-multi-choice/0"]);
    else if (deviceValue == '8')
      this.router.navigate(["/question-attitude/0"]);
  }

  

}
