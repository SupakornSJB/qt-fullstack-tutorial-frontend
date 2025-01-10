import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { VoteService } from "../../services/vote.service";
import { Router } from "@angular/router";

interface CreateVoteForm {
  title: FormControl<string>,
  description: FormControl<string>,
  option: FormControl<string>
}

@Component({
  selector: 'app-create-vote-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-vote-page.component.html',
  styleUrl: './create-vote-page.component.scss'
})
export class CreateVotePageComponent {
  voteInfo: FormGroup<CreateVoteForm>;
  options: string[] = [];
  optionError: string = "";

  constructor(
    formBuilder: FormBuilder,
    public voteService: VoteService,
    public router: Router
  ) {
    this.voteInfo = formBuilder.group({
      title: new FormControl("", { nonNullable: true }),
      description: new FormControl("", { nonNullable: true }),
      option: new FormControl("", { nonNullable: true })
    })
   }

   addOption() { 
    const option = this.voteInfo.value.option;
    if (!!!option || this.options.includes(option!)) {
      this.optionError = "Option cannot be empty or duplicate";
      return;
    }

    this.optionError = "";
    this.options.push(option!);
    this.voteInfo.setValue({
      title: this.voteInfo.value.title ?? "",
      description: this.voteInfo.value.description ?? "",
      option: ""
    });
   }

   removeOption(index: number){
    this.options.splice(index, 1);
   }

   submit() {
    if (!!!this.voteInfo.value.title || !!!this.voteInfo.value.description) return;
    this.voteService.createTopic(this.voteInfo.value.title, this.voteInfo.value.description, this.options);
    this.router.navigateByUrl("/");
   }
}