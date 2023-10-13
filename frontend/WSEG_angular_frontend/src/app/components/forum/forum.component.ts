import { Component, OnInit } from '@angular/core';
import {ForumService} from "../../services/forum.service";
import {DatePipe} from "@angular/common";
import {AuthenticationService} from "../../services/authentication.service";
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  private selectedQuestionId: number | undefined;
  private expansionPanelId: number | undefined;
  public questions: any[] = [];
  public checkoutFormQuestion = this.formBuilder.group({
    title: '',
    modul: '',
    description: ''
  });
  public checkoutFormAnswer = this.formBuilder.group({
    description: ''
  });

  constructor(private forumService: ForumService,
              private datePipe: DatePipe,
              public authenticationService: AuthenticationService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  private getQuestions(){
    this.forumService.getQuestions().subscribe(questions =>{
      this.questions = questions.data;
    });
  }

  public getDate(date: any) {
    return this.datePipe.transform(date, 'dd.MM.yyyy / HH:mm');
  }

  public openDialog(templateUrl: any, expansionPanelId: any, question?: any): void {
    this.dialog.open(templateUrl,{
      width:'60%'
    });
    //use selectedQuestionId if someone wants to create a new answer to the selected question
    this.selectedQuestionId = question.id;
    this.expansionPanelId = expansionPanelId;
  }

  public addQuestion() {
    const questionCreationData = {
      data: {
        title: this.checkoutFormQuestion.value.title,
        modul: this.checkoutFormQuestion.value.modul,
        description: this.checkoutFormQuestion.value.description,
        user: this.authenticationService.getCurrentUser().user.id
      }
    }
    this.forumService.addQuestion(questionCreationData).subscribe((message: any) =>{
      this.dialog.closeAll();
      this.getQuestions();
    });
  }

  public addAnswer(){
    const answerCreationData = {
      data: {
        description: this.checkoutFormAnswer.value.description,
        question: this.selectedQuestionId,
        user: this.authenticationService.getCurrentUser().user.id
      }
    }
    this.forumService.addAnswer(answerCreationData).subscribe((message: any) =>{
      this.getQuestions();
    });
  }

  public isOwnerOfQuestion(question: any){
    return (this.authenticationService.getCurrentUser() && this.authenticationService.getCurrentUser().user.id == question.attributes.user.data.id);
  }

  public isOwnerOfAnswer(answer: any){
    return (this.authenticationService.getCurrentUser() && this.authenticationService.getCurrentUser().user.id == answer.attributes.user.data.id);
  }

  public deleteQuestion(question: any){
    this.forumService.deleteQuestionById(question.id).subscribe((message:any) =>{
    });
    /* const tempQuestions: any[] = [];
    this.questions.forEach(forQuestion => {
      if(forQuestion.id !== question.id){
        tempQuestions.push(question);
      }
    });
    this.questions = tempQuestions; */
    this.getQuestions();
  }

  public deleteAnswer(answer: any){
    this.forumService.deleteAnswerById(answer.id).subscribe((message:any) =>{
      this.getQuestions();
    });
  }
}
