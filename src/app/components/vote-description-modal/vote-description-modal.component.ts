import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { inject } from '@angular/core';

@Component({
  selector: 'app-vote-description-modal',
  imports: [],
  templateUrl: './vote-description-modal.component.html',
  styleUrl: './vote-description-modal.component.scss'
})
export class VoteDescriptionModalComponent {
  @ViewChild('modalTemplate') content!: TemplateRef<any>;
  modalService = inject(NgbModal)
  title: string = "";
  description: string = "";

  showDescription(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.modalService.open(this.content);
  }
}
