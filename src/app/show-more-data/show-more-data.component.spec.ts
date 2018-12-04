import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMoreDataComponent } from './show-more-data.component';

describe('ShowMoreDataComponent', () => {
  let component: ShowMoreDataComponent;
  let fixture: ComponentFixture<ShowMoreDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMoreDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMoreDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
