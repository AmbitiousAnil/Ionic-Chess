import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayerMatchPage } from './player-match.page';

describe('PlayerMatchPage', () => {
  let component: PlayerMatchPage;
  let fixture: ComponentFixture<PlayerMatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerMatchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
