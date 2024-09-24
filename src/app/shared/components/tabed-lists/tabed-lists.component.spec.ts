import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabedListsComponent } from './tabed-lists.component';

describe('UsersListComponent', () => {
  let component: TabedListsComponent;
  let fixture: ComponentFixture<TabedListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabedListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabedListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
