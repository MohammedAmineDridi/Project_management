import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraMeetingComponent } from './camera-meeting.component';

describe('CameraMeetingComponent', () => {
  let component: CameraMeetingComponent;
  let fixture: ComponentFixture<CameraMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
