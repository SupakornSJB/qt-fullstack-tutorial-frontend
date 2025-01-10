import { Component, ViewChild, TemplateRef } from '@angular/core';
import { VoteService } from '../../services/vote.service';
import { VoteOption } from '../../interface/voteOption';
import { inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { VoteDescriptionModalComponent } from "../vote-description-modal/vote-description-modal.component";

@Component({
  selector: 'app-vote-modal',
  imports: [CommonModule, VoteDescriptionModalComponent],
  templateUrl: './vote-modal.component.html',
  styleUrl: './vote-modal.component.scss'
})
export class VoteModalComponent {
  @ViewChild('modalTemplate') content!: TemplateRef<any>;
  @ViewChild("descriptionModal") descriptionModal!: VoteDescriptionModalComponent;

  modalService = inject(NgbModal);

  showStat: boolean = false;
  statMode: boolean = false;
  currentId: number = -1;
  currentTitle: string = "";
  currentDescription: string = "";
  options: VoteOption[] = [];
  selectedOptionContent: string[] = [];

  constructor(public voteService: VoteService) { }

  get totalVotesAmount() {
    return this.options.reduce<number>((acc, curr) => acc += curr.totalVotes, 0);
  }

  showOnVoteScreen(id: number, title: string, description: string, showStatImmediate: boolean = false) { 
    this.showStat = false || showStatImmediate;
    this.statMode = showStatImmediate;
    this.currentId = id;
    this.currentTitle = title;
    this.currentDescription = description;
    this.selectedOptionContent = [];
    this.voteService.getOptions(id).subscribe((data) => {
      this.options = data;
    })
    this.modalService.open(this.content);
  }

  addToVoted(content: string) {
    const alreadySelectedIndex = this.selectedOptionContent.findIndex((selected) => selected === content);
    if (alreadySelectedIndex === -1) 
      this.selectedOptionContent.push(content);
    else 
      this.selectedOptionContent.splice(alreadySelectedIndex, 1);
  }

  submitVote() {
    this.voteService.vote(this.currentId, this.selectedOptionContent);
    this.selectedOptionContent.forEach((option) => {
      const selected = this.options.find((op) => op.content === option);
      if (!!!selected) return;
      selected.totalVotes++;
    })
    this.showStat = true;
    this.statMode = true;
  }

  showDetail() {
    this.descriptionModal.showDescription(this.currentTitle, this.currentDescription);
  }
}