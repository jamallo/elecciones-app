import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeDialogComponent } from './sede-dialog.component';

describe('SedeDialogComponent', () => {
  let component: SedeDialogComponent;
  let fixture: ComponentFixture<SedeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SedeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedeDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
