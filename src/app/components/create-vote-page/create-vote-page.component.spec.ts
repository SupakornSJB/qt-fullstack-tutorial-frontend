import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVotePageComponent } from './create-vote-page.component';

describe('CreateVotePageComponent', () => {
  let component: CreateVotePageComponent;
  let fixture: ComponentFixture<CreateVotePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVotePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
