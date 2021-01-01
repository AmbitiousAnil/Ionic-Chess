import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomBattlePage } from './custom-battle.page';

describe('CustomBattlePage', () => {
  let component: CustomBattlePage;
  let fixture: ComponentFixture<CustomBattlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomBattlePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomBattlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
