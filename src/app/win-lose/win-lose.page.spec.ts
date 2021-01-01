import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WinLosePage } from './win-lose.page';

describe('WinLosePage', () => {
  let component: WinLosePage;
  let fixture: ComponentFixture<WinLosePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinLosePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WinLosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
