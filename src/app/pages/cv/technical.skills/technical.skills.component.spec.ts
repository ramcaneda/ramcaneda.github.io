import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Technical.SkillsComponent } from './technical.skills.component';

describe('Technical.SkillsComponent', () => {
  let component: Technical.SkillsComponent;
  let fixture: ComponentFixture<Technical.SkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Technical.SkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Technical.SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
