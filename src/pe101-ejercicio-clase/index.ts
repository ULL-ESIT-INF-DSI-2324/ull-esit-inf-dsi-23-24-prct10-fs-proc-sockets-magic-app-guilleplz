import * as Carta from "./card.js";
import fs from 'fs';
import chalk from "chalk";

// ______________________________________________SAVE CARDS______________________________________________

export const SaveCard = (user: string, cartas: Carta.Carta[], callback: (error: string | undefined) => void) => {
  const userDirectory = "./cartas/" + user;
  const fileName = userDirectory + "/" + user + ".json";

  fs.open(fileName, (err) => {     // comprobamos si existe el fichero y se puede acceder
    if (err) {
      fs.mkdir(userDirectory, { recursive: true }, (err) => {     // si no existe creamos la carpeta
        if (err) {
          callback(err.message)
        } else {
          fs.writeFile(fileName, JSON.stringify([]), (err) => {     // creamos el fichero
            if (err) {
              callback(err.message)
            }
          });
        }
      });
    }
  });

  fs.truncate(fileName, 0, (err) => { // vaciamos el fichero
    if (err) {
      callback(err.message)
    } else {
      fs.writeFile(fileName, JSON.stringify(cartas), (err) => {
        if (err) {
          callback(err.message)
        } else {
          callback(undefined)
        }
      })
    }
  });
};


// export function SaveCard(user: string, cartas: Carta.Carta[]): void {
//   const userDirectory = "./cartas/" + user;
//   const fileName = userDirectory + "/" + user + ".json";
//   fs.truncateSync(fileName, 0)
//   fs.writeFileSync(fileName, JSON.stringify(cartas));
// }



// ______________________________________________LOAD CARDS______________________________________________


export const LoadCards = (user: string, callback: (error: string | undefined, cartas: Carta.Carta[] | undefined) => void) => {
  const userDirectory = "./cartas/" + user;
  const fileName = userDirectory + "/" + user + ".json";

  fs.open(fileName, (err) => {     // comprobamos si existe el fichero y se puede acceder
    if (err) {
      fs.mkdir(userDirectory, { recursive: true }, (err) => {     // si no existe creamos la carpeta
        if (err) {
          callback(err.message, undefined)
        } else {
          fs.writeFile(fileName, JSON.stringify([]), (err) => {     // creamos el fichero
            if (err) {
              callback(err.message, undefined)
            }
          });
        }
      });
    }
  });

  fs.stat(fileName, (err, stats) => {     // comprobamos las estadísticas del fichero
    if (err) {
      callback(err.message, undefined)
    } else {
      if (stats.size === 2) {     // si el fichero está vacío
        console.log(chalk.green("No se encontró colección, creando una nueva colección al usuario " + user));
        fs.writeFile(fileName, JSON.stringify([]), (err) => {     // creamos el fichero
          if (err) {
            callback(err.message, undefined)
          }
        });
        callback(undefined, [])
      } else {     // si el fichero tiene contenido
        fs.readFile(fileName, 'utf-8', (err, data) => {
          if (err) {
            callback(err.message, undefined)
          } else {
            const jsoncards = JSON.parse(data);
            const cards: Carta.Carta[] = jsoncards.map((carta: Carta.Carta) => ({
              ID: carta.ID,
              Name: carta.Name,
              ManaCost: carta.ManaCost,
              Color: carta.Color,
              TimeLine: carta.TimeLine,
              Rarity: carta.Rarity,
              Rules: carta.Rules,
              Strength: carta.Strength,
              Loyalty: carta.Loyalty,
              Value: carta.Value
            }));
            callback(undefined, cards)
          }
        });
        

      }
    }
  });
};

// export function LoadCards(user: string): Carta.Carta[] {
//   const userDirectory = "./cartas/" + user
//   const fileName = userDirectory + "/" + user + ".json";
  
//   // Comprobamos si existe el directorio del usuario
//   if (!fs.existsSync(userDirectory)) {
//     fs.mkdirSync(userDirectory, { recursive: true });
//     fs.writeFileSync(fileName, JSON.stringify(""))
//   }

//   // sacamos las estadisticas del fichero
//   const stats = fs.statSync(fileName);

//   // si el fichero está vacío
//   if (stats.size === 2) {
    
//     // devolvemos un array vacío
//     console.log(chalk.green("No se encontró colección, creando una nueva colección al usuario " + user));
//     fs.writeFileSync(fileName, JSON.stringify([]));
//     return []
    
//   } else { // si el fichero tiene contenido creamos las cartas y devolvemos el array de cartas

//     const jsoncontent = fs.readFileSync(fileName, 'utf-8');
//     const jsoncards = JSON.parse(jsoncontent);
    
//     const cards: Carta.Carta[] = jsoncards.map((carta: Carta.Carta) => ({
//       ID: carta.ID,
//       Name: carta.Name,
//       ManaCost: carta.ManaCost,
//       Color: carta.Color,
//       TimeLine: carta.TimeLine,
//       Rarity: carta.Rarity,
//       Rules: carta.Rules,
//       Strength: carta.Strength,
//       Loyalty: carta.Loyalty,
//       Value: carta.Value
//     }));

//     return cards;

//   }
// }




