import { UniqueIdService } from './unique-id.service';

// UniqueIdService.name é o nome da classe.
describe('Service: ' + UniqueIdService.name, () => {

  let service: UniqueIdService = null;

  // Antes de fazer cada teste, gera uma nova instância da entidade service.
  beforeEach(() => {
    service = new UniqueIdService();
  })

  // Aqui está a escrita de um teste.
  // Neste caso, estamos testando a classe generateUniqueIdWithPrefix
  // Por convensão, o teste DEVE (SHOULD) fazer algo, QUANDO(WHEN) algo aconter
  // Com isto em mente, sabemos o que deve acontecer para que nosso teste passe ou não.
  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
      should generate id when called with prefix`, () => {

    const id = service.generateUniqueIdWithPrefix('app');

    expect(id.startsWith('app-')).toBeTrue();

  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should not generate duplicate IDs when called multiple times`, () => {

    const ids = new Set();

    for (let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }

    expect(ids.size).toBe(50);

  });

  it(`#${UniqueIdService.prototype.getNumberOfGeneratorUniqueIds.name}
      should return the number of generated IDs when called`, () => {

    service.generateUniqueIdWithPrefix('apps');
    service.generateUniqueIdWithPrefix('apps');

    expect(service.getNumberOfGeneratorUniqueIds()).toBe(2);

  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
      should throw new called with empty`, () => {

        const emptyValues = [null, undefined, '', '0', '1'];

        emptyValues.forEach((emptyValue) => {
          expect(() => service.generateUniqueIdWithPrefix(emptyValue))
            .withContext(`Empty Value: ${emptyValue}`)
            .toThrow();
        });

  });

});
