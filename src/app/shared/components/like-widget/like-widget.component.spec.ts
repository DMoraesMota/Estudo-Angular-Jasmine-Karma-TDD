import { LikeWidgetModule } from './like-widget.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UniqueIdService } from './../../service/unique-id/unique-id.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikeWidgetComponent } from './like-widget.component';

describe('Component: ' + LikeWidgetComponent.name, () => {

  /* Fixture neste caso não é o componente em si, mas um wraper que terá a instância do meu componente, onde através dele, poderemos chamar
   os métodos, e inúmeras outras funcionalidades que nós auxiliaram nos testes. */
  let fixture: ComponentFixture<LikeWidgetComponent> = null;

  let component: LikeWidgetComponent = null;

  beforeEach(async () => {

    /* Aqui passamos os parametros para criarmos o módulo de teste para que todas as dependências sejam resolvidas de forma automática pelo TestBed
     Esta forma declarativa das dependências é uma forma ideal para quem está fazendo o TDD, ou seja, os testes antes do código efetivamente. */

    // await TestBed.configureTestingModule({
    //   declarations: [LikeWidgetComponent],
    //   providers: [UniqueIdService],
    //   imports: [FontAwesomeModule]
    // }).compileComponents();

    /* Esta forma de construir o módulo de teste já importa o módulo diretamente, este modelo é aconselhado
     caso o módulo seja todo desenvolvido e depois os testes são construídos. */

    await TestBed.configureTestingModule({
      imports: [LikeWidgetModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;

  });

  it('Should create component', () => {

    //Validando se a instância foi efetivamente criada. Se não for criada, retornará NULL e com isto, não passará no teste.
    expect(component).toBeTruthy();

  });

  it('Should auto generate ID during ngOnInit when (@Input id) is not assigned', () => {

    // Nos testes o Angular não faz o gerenciamento automático do clico de vida, por isto, precisamos usar o wraper do fixture para forçar essa validação.
    fixture.detectChanges();

    expect(component.id).toBeTruthy();

  });

  it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {

    const someId = 'someIdTests'
    component.id = someId;
    fixture.detectChanges();

    expect(component.id).toBe(someId);

  });

  it(`#${LikeWidgetComponent.prototype.like.name}
      Should trigger (@Output liked) when called`, () => {

      // SpyOn é um método do Jasmine poderissimo que "espiona" um método que eu quero observar desde o inicio da execuçã do teste
      // Neste caso, ele pega o estado antes de executar qualquer coisa.
      spyOn(component.liked, 'emit');

      fixture.detectChanges();
      component.like();
      expect(component.liked.emit).toHaveBeenCalled();

  });

})
