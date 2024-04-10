import 'mocha'
import { expect } from 'chai'
import { LoadCards, SaveCard } from '../../src/pe101-ejercicio-clase/index.js'
import fs from 'fs'


describe('Test de la función SaveCards', () => {
  it('Debería guardar las cartas de un usuario en un fichero', (done) => {
    const user = "prueba";
    const carta1 = {
      ID: 1,
      Name: "Carta 1",
      ManaCost: 1,
      Color: 1,
      TimeLine: 3,
      Rarity: 4,
      Rules: "Reglas de la carta 1",
      Value: 1,
      Strength: [1, 1],
      Loyalty: 1
    };
    const carta2 = {
      ID: 2,
      Name: "Carta 2",
      ManaCost: 2,
      Color: 1,
      TimeLine: 2,
      Rarity: 3,
      Rules: "Reglas de la carta 2",
      Value: 2,
      Strength: [2, 2],
      Loyalty: 2
    };
    const cartas = [carta1, carta2];
    SaveCard(user, cartas, (err) => {
      expect(err).to.be.undefined;
      fs.rmdir(`./cartas/${user}`, { recursive: true }, (err) => {
        if (err) {
          console.log(err);
        }
      });
      done();
    });
  });
});



describe('Test de la función LoadCards', () => {
  it('Debería cargar las cartas de un usuario de un fichero', (done) =>
  {
    const user = "prueba";
    LoadCards(user, (err, cards) => {
      expect(err).to.be.undefined;
      expect(cards).to.be.an('array');
      fs.rmdir(`./cartas/${user}`, { recursive: true }, (err) => {
        if (err) {
          console.log(err);
        }
      });
      done();
    });
  });
});