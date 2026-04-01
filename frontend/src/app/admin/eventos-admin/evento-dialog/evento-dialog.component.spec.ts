import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoDialogComponent } from './evento-dialog.component';

describe('EventoDialogComponent', () => {
  let component: EventoDialogComponent;
  let fixture: ComponentFixture<EventoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
