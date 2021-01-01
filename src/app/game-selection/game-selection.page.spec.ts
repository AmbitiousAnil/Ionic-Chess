import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GameSelectionPage } from './game-selection.page';

describe('GameSelectionPage', () => {
  let component: GameSelectionPage;
  let fixture: ComponentFixture<GameSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSelectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GameSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
