import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgSelectOption, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubjectgroupSearchComponent } from './subjectgroups/subjectgroup-search/subjectgroup-search.component';
import { SubjectsubSearchComponent } from './subjectsubs/subjectsub-search/subjectsub-search.component';
import { SubjectSearchComponent } from './subjects/subject-search/subject-search.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { StaffComponent } from './staffs/staff/staff.component';
import { StaffSearchComponent } from './staffs/staff-search/staff-search.component';
import { QuestionSearchComponent } from './questions/question-search/question-search.component';
import { QuestionMultiChoiceComponent } from './questions/question-multi-choice/question-multi-choice.component';
import { QuestionTfComponent } from './questions/question-tf/question-tf.component';
import { QuestionShortAnsComponent } from './questions/question-short-ans/question-short-ans.component';
import { QuestionEassyComponent } from './questions/question-eassy/question-eassy.component';
import { QuestionMultiMathComponent } from './questions/question-multi-math/question-multi-math.component';
import { QuestionAssigmentComponent } from './questions/question-assigment/question-assigment.component';
import { SubjectgroupComponent } from './subjectgroups/subjectgroup/subjectgroup.component';
import { SubjectComponent } from './subjects/subject/subject.component';
import { SubjectsubComponent } from './subjectsubs/subjectsub/subjectsub.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { StudentComponent } from './students/student/student.component';
import { StudentSearchComponent } from './students/student-search/student-search.component';
import { QuestionComponent } from './questions/question/question.component';
import { QuestionReadTextMultiChoiceComponent } from './questions/question-read-text-multi-choice/question-read-text-multi-choice.component';
import { QuestionAttitudeComponent } from './questions/question-attitude/question-attitude.component';
import { TestSearchComponent } from './tests/test-search/test-search.component';
import { TestComponent } from './tests/test/test.component';
import { ExamSearchComponent } from './exams/exam-search/exam-search.component';
import { ExamComponent } from './exams/exam/exam.component';
import { ExamTableComponent } from './exams/exam-table/exam-table.component';
import { ExamRegisterComponent } from './exams/exam-register/exam-register.component';
import { ExamRegisterSearchComponent } from './exams/exam-register-search/exam-register-search.component';
import { GradeSearchComponent } from './grades/grade-search/grade-search.component';
import { GradeDetailSearchComponent } from './grades/grade-detail-search/grade-detail-search.component';
import { QuestionLevelComponent } from './report/question-level/question-level.component';
import { QuestionAnalyzeComponent } from './report/question-analyze/question-analyze.component';
import { ExamStudentComponent } from './report/exam-student/exam-student.component';
import { ExamStudentBestScoreComponent } from './report/exam-student-best-score/exam-student-best-score.component';
import { ExamStudentListComponent } from './report/exam-student-list/exam-student-list.component';
import { ExamStudentAllComponent } from './report/exam-student-all/exam-student-all.component';
import { ExamByMonthComponent } from './report/exam-by-month/exam-by-month.component';
import { ExamByDateComponent } from './report/exam-by-date/exam-by-date.component';
import { GradeProveComponent } from './grades/grade-prove/grade-prove.component';
import { LoginStudentComponent } from './authstudent/login-student/login-student.component';
import { ExaminationSelectComponent } from './examinations/examination-select/examination-select.component';
import { ExaminationComponent } from './examinations/examination/examination.component';
import { ExaminationEndComponent } from './examinations/examination-end/examination-end.component';
import { StudentLayoutComponent } from './layout/student-layout/student-layout.component';
import { GradeEndComponent } from './grades/grade-end/grade-end.component';
import { ExaminationSendTypeComponent } from './examinations/examination-send-type/examination-send-type.component';
import { ExaminationSummaryComponent } from './examinations/examination-summary/examination-summary.component';

import { AppService } from "./share/service/app.service";
import { AppData } from "./share/data/app.data";
import { SessionService } from './share/service/session.service';
import { Interceptor } from './share/service/httpinterceptor';
import { AnswerComponent } from './questions/answer/answer.component';
import { TestQrandomComponent } from './tests/test-qrandom/test-qrandom.component';
import { TestQcustomComponent } from './tests/test-qcustom/test-qcustom.component';
import { ResetPasswordStudentComponent } from './authstudent/reset-password-student/reset-password-student.component';
import { ExamViewComponent } from './exams/exam-view/exam-view.component';
import { AttitudeSetupComponent } from './setups/attitude-setup/attitude-setup.component';
import { QuestionQuestionComponent } from './questions/question-question/question-question.component';
import { ExamSetupComponent } from './setups/exam-setup/exam-setup.component';
import { SendResultSetupComponent } from './setups/send-result-setup/send-result-setup.component';
import { PlyrModule } from 'ngx-plyr';
import { LoginStaffHistoryComponent } from './staffs/login-staff-history/login-staff-history.component';
import { LoginStudentHistoryComponent } from './students/login-student-history/login-student-history.component';
import { ExamMoveComponent } from './exams/exam-move/exam-move.component';
import { ExaminationMessageComponent } from './examinations/examination-message/examination-message.component';
import { TempComponent } from './questions/temp/temp.component';
import { TestViewComponent } from './tests/test-view/test-view.component';
import { Temp2Component } from './questions/temp2/temp2.component';
import { ImageSetupComponent } from './setups/image-setup/image-setup.component';
import { QuestionExampleComponent } from './questions/question-example/question-example.component';
import { MmSubQuestionComponent } from './questions/mm-sub-question/mm-sub-question.component';
import { MmSubAnswerComponent } from './questions/mm-sub-answer/mm-sub-answer.component';
import { QuestionViewComponent } from './questions/question-view/question-view.component';
import { QuestionViewChildComponent } from './questions/question-view-child/question-view-child.component';
import { DownloadComponent } from './download/download.component';
import { Temp3Component } from './questions/temp3/temp3.component';
import { ExamStudentGreatsComponent } from './report/exam-student-greats/exam-student-greats.component';
import { ExamStudentGreatsBestScoreComponent } from './report/exam-student-greats-best-score/exam-student-greats-best-score.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-student', component: LoginStudentComponent },
  { path: 'forgot', component: ForgotComponent },
  {
    path: 'download', component: MainLayoutComponent,
    children: [
      { path: '', component: DownloadComponent }
    ]
  },  
  {
    path: 'subjectgroup-search', component: MainLayoutComponent,
    children: [
      { path: '', component: SubjectgroupSearchComponent }
    ]
  },
  {
    path: 'subjectgroup/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: SubjectgroupComponent }
    ]
  },  
  {
    path: 'subject-search', component: MainLayoutComponent,
    children: [
      { path: '', component: SubjectSearchComponent }
    ]
  },
  {
    path: 'subject/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: SubjectComponent }
    ]
  },  
  {
    path: 'subjectsub-search', component: MainLayoutComponent,
    children: [
      { path: '', component: SubjectsubSearchComponent }
    ]
  },
  {
    path: 'subjectsub/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: SubjectsubComponent }
    ]
  },
  {
    path: 'temp', component: MainLayoutComponent,
    children: [
      { path: '', component: TempComponent }
    ]
  },
  {
    path: 'temp2', component: MainLayoutComponent,
    children: [
      { path: '', component: Temp2Component }
    ]
  },
  {
    path: 'temp3', component: MainLayoutComponent,
    children: [
      { path: '', component: Temp3Component }
    ]
  },
  {
    path: 'question-search', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionSearchComponent }
    ]
  },
  {
    path: 'question', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionComponent }
    ]
  },
  {
    path: 'question-assigment/:id/:pid', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionAssigmentComponent }
    ]
  },
  {
    path: 'question-eassy/:id/:pid', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionEassyComponent }
    ]
  },
  {
    path: 'question-multi-choice/:id/:pid', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionMultiChoiceComponent }
    ]
  },
  {
    path: 'question-multi-math/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionMultiMathComponent }
    ]
  },
  {
    path: 'mm-sub-question/:id/:qid', component: MainLayoutComponent,
    children: [
      { path: '', component: MmSubQuestionComponent }
    ]
  },
  {
    path: 'mm-sub-answer/:id/:qid', component: MainLayoutComponent,
    children: [
      { path: '', component: MmSubAnswerComponent }
    ]
  },
  {
    path: 'question-short-ans/:id/:pid', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionShortAnsComponent }
    ]
  },
  {
    path: 'question-tf/:id/:pid', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionTfComponent }
    ]
  },
  {
    path: 'question-attitude/:id/:pid', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionAttitudeComponent }
    ]
  },
  {
    path: 'question-read-text-multi-choice/:id/:pid', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionReadTextMultiChoiceComponent }
    ]
  },
  {
    path: 'answer/:qid/:id/:pid', component: MainLayoutComponent,
    children: [
      { path: '', component: AnswerComponent }
    ]
  },
  {
    path: 'question-question/:pid', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionQuestionComponent }
    ]
  },
  {
    path: 'question-view/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionViewComponent }
    ]
  },
  {
    path: 'question-view-child/:id/:pid', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionViewChildComponent }
    ]
  },
  {
    path: 'dashboard', component: MainLayoutComponent,
    children: [
      { path: '', component: DashboardComponent }
    ]
  },     
  {
    path: 'student-search', component: MainLayoutComponent,
    children: [
      { path: '', component: StudentSearchComponent }
    ]
  },
  {
    path: 'student/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: StudentComponent }
    ]
  },
  {
    path: 'staff-search', component: MainLayoutComponent,
    children: [
      { path: '', component: StaffSearchComponent }
    ]
  },
  {
    path: 'staff/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: StaffComponent }
    ]
  },
  {
    path: 'reset-password/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: ResetPasswordComponent }
    ]
  },
  {
    path: 'reset-password-student/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: ResetPasswordStudentComponent }
    ]
  }, 
  {
    path: 'test/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: TestComponent }
    ]
  },
  {
    path: 'test-view/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: TestViewComponent }
    ]
  },
  {
    path: 'test-search', component: MainLayoutComponent,
    children: [
      { path: '', component: TestSearchComponent }
    ]
  },
  {
    path: 'test-qrandom/:tid/:gid/:sid/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: TestQrandomComponent }
    ]
  },
  {
    path: 'test-qcustom/:tid/:gid/:sid/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: TestQcustomComponent }
    ]
  },
  {
    path: 'exam-search', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamSearchComponent }
    ]
  },
  {
    path: 'exam/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamComponent }
    ]
  },
  {
    path: 'exam-view/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamViewComponent }
    ]
  },
  {
    path: 'exam-register', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamRegisterComponent }
    ]
  },
  {
    path: 'exam-register-search/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamRegisterSearchComponent }
    ]
  },
  {
    path: 'exam-table', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamTableComponent }
    ]
  },
  {
    path: 'exam-setup', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamSetupComponent }
    ]
  },
  {
    path: 'exam-move/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamMoveComponent }
    ]
  },
  {
    path: 'grade-search', component: MainLayoutComponent,
    children: [
      { path: '', component: GradeSearchComponent }
    ]
  },
  {
    path: 'grade-detail-search/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: GradeDetailSearchComponent }
    ]
  },
  {
    path: 'login-student-history/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: LoginStudentHistoryComponent }
    ]
  },
  {
    path: 'login-staff-history/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: LoginStaffHistoryComponent }
    ]
  },
  {
    path: 'exam-student-list', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamStudentListComponent }
    ]
  },
  {
    path: 'exam-student', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamStudentComponent }
    ]
  },
  {
    path: 'exam-student-best-score/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamStudentBestScoreComponent }
    ]
  },
  {
    path: 'exam-by-date', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamByDateComponent }
    ]
  },
  {
    path: 'exam-by-month', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamByMonthComponent }
    ]
  },
  {
    path: 'question-analyze', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionAnalyzeComponent }
    ]
  },
  {
    path: 'question-level', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionLevelComponent }
    ]
  },
  {
    path: 'exam-student-all/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamStudentAllComponent }
    ]
  },
  {
    path: 'exam-student-greats/:id', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamStudentGreatsComponent }
    ]
  },
  {
    path: 'grade-prove/:id/:ix', component: MainLayoutComponent,
    children: [
      { path: '', component: GradeProveComponent }
    ]
  },
  {
    path: 'grade-end', component: MainLayoutComponent,
    children: [
      { path: '', component: GradeEndComponent }
    ]
  },
  {
    path: 'image-setup', component: MainLayoutComponent,
    children: [
      { path: '', component: ImageSetupComponent }
    ]
  },
  {
    path: 'attitude-setup', component: MainLayoutComponent,
    children: [
      { path: '', component: AttitudeSetupComponent }
    ]
  },
  {
    path: 'send-result-setup', component: MainLayoutComponent,
    children: [
      { path: '', component: SendResultSetupComponent }
    ]
  },
  {
    path: 'examination/:id/:ix', component: StudentLayoutComponent,
    children: [
      { path: '', component: ExaminationComponent }
    ]
  },
  {
    path: 'examination-end/:id', component: StudentLayoutComponent,
    children: [
      { path: '', component: ExaminationEndComponent }
    ]
  },
  {
    path: 'examination-select', component: StudentLayoutComponent,
    children: [
      { path: '', component: ExaminationSelectComponent }
    ]
  },
  {
    path: 'examination-send-type/:id', component: StudentLayoutComponent,
    children: [
      { path: '', component: ExaminationSendTypeComponent }
    ]
  },
  {
    path: 'examination-summary', component: StudentLayoutComponent,
    children: [
      { path: '', component: ExaminationSummaryComponent }
    ]
  },
  {
    path: 'examination-message', component: StudentLayoutComponent,
    children: [
      { path: '', component: ExaminationMessageComponent }
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotComponent,
    DashboardComponent,
    SubjectgroupSearchComponent,
    SubjectsubSearchComponent,
    SubjectSearchComponent,
    MainLayoutComponent,
    StaffComponent,
    StaffSearchComponent,
    QuestionSearchComponent,
    QuestionMultiChoiceComponent,
    QuestionTfComponent,
    QuestionShortAnsComponent,
    QuestionEassyComponent,
    QuestionMultiMathComponent,
    QuestionAssigmentComponent,
    SubjectgroupComponent,
    SubjectComponent,
    SubjectsubComponent,
    ResetPasswordComponent,    
    StudentComponent,
    StudentSearchComponent,
    QuestionComponent,
    QuestionReadTextMultiChoiceComponent,
    QuestionAttitudeComponent,
    TestSearchComponent,
    TestComponent,
    ExamSearchComponent,
    ExamComponent,
    ExamTableComponent,
    ExamRegisterComponent,
    ExamRegisterSearchComponent,
    GradeSearchComponent,
    GradeDetailSearchComponent,
    QuestionLevelComponent,
    QuestionAnalyzeComponent,
    ExamStudentComponent,
    ExamStudentBestScoreComponent,
    ExamStudentListComponent,
    ExamStudentAllComponent,
    ExamByMonthComponent,
    ExamByDateComponent,
    GradeProveComponent,
    LoginStudentComponent,
    ExaminationSelectComponent,
    ExaminationComponent,
    ExaminationEndComponent,
    StudentLayoutComponent,
    GradeEndComponent,
    ExaminationSendTypeComponent,
    ExaminationSummaryComponent,
    AnswerComponent,
    TestQrandomComponent,
    TestQcustomComponent,
    ResetPasswordStudentComponent,
    ExamViewComponent,
    AttitudeSetupComponent,
    QuestionQuestionComponent,
    ExamSetupComponent,
    SendResultSetupComponent,
    LoginStaffHistoryComponent,
    LoginStudentHistoryComponent,
    ExamMoveComponent,
    ExaminationMessageComponent,
    TempComponent,
    TestViewComponent,
    Temp2Component,
    ImageSetupComponent,
    QuestionExampleComponent,
    MmSubQuestionComponent,
    MmSubAnswerComponent,
    QuestionViewComponent,
    QuestionViewChildComponent,
    DownloadComponent,
    Temp3Component,
    ExamStudentGreatsComponent,
    ExamStudentGreatsBestScoreComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    PlyrModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    AppService,
    AppData,
    SessionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
