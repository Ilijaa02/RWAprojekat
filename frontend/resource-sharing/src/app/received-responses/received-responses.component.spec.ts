import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedResponsesComponent } from './received-responses.component';

describe('ReceivedResponsesComponent', () => {
  let component: ReceivedResponsesComponent;
  let fixture: ComponentFixture<ReceivedResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceivedResponsesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivedResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
