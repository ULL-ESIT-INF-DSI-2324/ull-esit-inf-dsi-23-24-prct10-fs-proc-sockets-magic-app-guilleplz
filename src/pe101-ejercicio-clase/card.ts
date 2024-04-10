
export enum Color {
  blanco,
  azul,
  negro,
  rojo,
  verde,
  incoloro,
  multicolor
}

export enum TimeLine {
  tierra,
  criatura,
  encantamiento,
  conjuro,
  instantaneo,
  artefacto,
  planeswalker
}

export enum Rarity {
  comun,
  infrecuente,
  rara,
  mitica,
  legendaria
}

export type Strength = [number, number] | number[];

export type Carta = {
  ID: number;
  Name: string;
  ManaCost: number;
  Color: Color;
  TimeLine: TimeLine;
  Rarity: Rarity;
  Rules: string;
  Value: number;
  Strength: Strength | undefined;
  Loyalty: number | undefined;
};