import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgSelectOption } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';

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
import { LoginLogoutHistoryComponent } from './report/login-logout-history/login-logout-history.component';
import { StudentComponent } from './students/student/student.component';
import { StudentSearchComponent } from './students/student-search/student-search.component';
import { QuestionComponent } from './questions/question/question.component';
import { QuestionReadTextMultiChoiceComponent } from './questions/question-read-text-multi-choice/question-read-text-multi-choice.component';
import { QuestionAttitudeComponent } from './questions/question-attitude/question-attitude.component';
import { QuestionComMultiChoiceComponent } from './questions/question-com-multi-choice/question-com-multi-choice.component';
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

const appRoutes: Routes = [
  { path: '', component: LoginStudentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-student', component: LoginStudentComponent },
  { path: 'forgot', component: ForgotComponent },
  {
    path: 'subjectgroup-search', component: MainLayoutComponent,
    children: [
      { path: '', component: SubjectgroupSearchComponent }
    ]
  },
  {
    path: 'subjectgroup', component: MainLayoutComponent,
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
    path: 'subject', component: MainLayoutComponent,
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
    path: 'subjectsub', component: MainLayoutComponent,
    children: [
      { path: '', component: SubjectsubComponent }
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
    path: 'question-assigment', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionAssigmentComponent }
    ]
  },
  {
    path: 'question-eassy', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionEassyComponent }
    ]
  },
  {
    path: 'question-multi-choice', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionMultiChoiceComponent }
    ]
  },
  {
    path: 'question-multi-math', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionMultiMathComponent }
    ]
  },
  {
    path: 'question-short-ans', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionShortAnsComponent }
    ]
  },
  {
    path: 'question-tf', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionTfComponent }
    ]
  },
  {
    path: 'question-attitude', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionAttitudeComponent }
    ]
  },
  {
    path: 'question-com-multi-choice', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionComMultiChoiceComponent }
    ]
  },
  {
    path: 'question-read-text-multi-choice', component: MainLayoutComponent,
    children: [
      { path: '', component: QuestionReadTextMultiChoiceComponent }
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
    path: 'student', component: MainLayoutComponent,
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
    path: 'staff', component: MainLayoutComponent,
    children: [
      { path: '', component: StaffComponent }
    ]
  },
  {
    path: 'reset-password', component: MainLayoutComponent,
    children: [
      { path: '', component: ResetPasswordComponent }
    ]
  },     
  {
    path: 'test', component: MainLayoutComponent,
    children: [
      { path: '', component: TestComponent }
    ]
  },
  {
    path: 'test-search', component: MainLayoutComponent,
    children: [
      { path: '', component: TestSearchComponent }
    ]
  },
  {
    path: 'exam-search', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamSearchComponent }
    ]
  },
  {
    path: 'exam', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamComponent }
    ]
  },
  {
    path: 'exam-register', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamRegisterComponent }
    ]
  },
  {
    path: 'exam-register-search', component: MainLayoutComponent,
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
    path: 'grade-search', component: MainLayoutComponent,
    children: [
      { path: '', component: GradeSearchComponent }
    ]
  },
  {
    path: 'grade-detail-search', component: MainLayoutComponent,
    children: [
      { path: '', component: GradeDetailSearchComponent }
    ]
  },
  {
    path: 'login-logout-history', component: MainLayoutComponent,
    children: [
      { path: '', component: LoginLogoutHistoryComponent }
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
    path: 'exam-student-best-score', component: MainLayoutComponent,
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
    path: 'exam-student-all', component: MainLayoutComponent,
    children: [
      { path: '', component: ExamStudentAllComponent }
    ]
  },
  {
    path: 'grade-prove', component: MainLayoutComponent,
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
    path: 'examination', component: StudentLayoutComponent,
    children: [
      { path: '', component: ExaminationComponent }
    ]
  },
  {
    path: 'examination-end', component: StudentLayoutComponent,
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
    path: 'examination-send-type', component: StudentLayoutComponent,
    children: [
      { path: '', component: ExaminationSendTypeComponent }
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
    LoginLogoutHistoryComponent,
    StudentComponent,
    StudentSearchComponent,
    QuestionComponent,
    QuestionReadTextMultiChoiceComponent,
    QuestionAttitudeComponent,
    QuestionComMultiChoiceComponent,
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
    ExaminationSendTypeComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
