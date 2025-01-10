import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteDescriptionModalComponent } from './vote-description-modal.component';

describe('VoteDescriptionModalComponent', () => {
  let component: VoteDescriptionModalComponent;
  let fixture: ComponentFixture<VoteDescriptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteDescriptionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteDescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
