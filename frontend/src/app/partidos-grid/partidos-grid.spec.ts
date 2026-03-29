import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosGrid } from './partidos-grid';

describe('PartidosGrid', () => {
  let component: PartidosGrid;
  let fixture: ComponentFixture<PartidosGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartidosGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidosGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
