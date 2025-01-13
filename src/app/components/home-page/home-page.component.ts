import { Component, OnInit, ViewChild } from '@angular/core';
import { VoteService } from '../../services/vote.service';
import { VoteTopic } from '../../interface/voteTopic';
import { CommonModule } from '@angular/common';
import { VoteModalComponent } from "../vote-modal/vote-modal.component";

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, VoteModalComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  public voteTopics: VoteTopic[] = [];
  @ViewChild("voteModal") voteModal!: VoteModalComponent;
  firstId: number = -1;
  lastId: number = -1;

  constructor(public voteService: VoteService) { }
   
  ngOnInit(): void {
    this.goForward();
  }

  showVoteOnScreen(topic: VoteTopic) {
    this.voteModal.showOnVoteScreen(topic.id, topic.title, topic.description);
  }

  showReport(topic: VoteTopic) {
    this.voteModal.showOnVoteScreen(topic.id, topic.title, topic.description, true);
  }

  goForward() {
    this.goPage(this.lastId);
  }

  goBackward() {
    this.goPage(this.firstId, true);
  }

  private goPage(cursorTopicId: number, reverse: boolean = false) {
    this.voteService.getTopics(cursorTopicId, reverse).subscribe((voteTopics) => {
      if (voteTopics.length === 0) return;
      this.voteTopics = voteTopics;
      this.firstId = voteTopics[0].id;
      this.lastId = voteTopics[voteTopics.length -1].id;
    });
  }
}