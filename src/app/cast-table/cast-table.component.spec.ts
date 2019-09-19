import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastTableComponent } from './cast-table.component';

describe('CastTableComponent', () => {
  let component: CastTableComponent;
  let fixture: ComponentFixture<CastTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
