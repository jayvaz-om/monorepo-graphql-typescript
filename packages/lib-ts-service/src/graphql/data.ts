import { Pokemon } from './__generated__/schema';

export const pokedex: Pokemon[] = [
  {
    id: 'UG9rZW1vbjowMDE=',
    number: '001',
    name: 'Bulbasaur',
    weight: {
      minimum: '6.04kg',
      maximum: '7.76kg',
    },
    height: {
      minimum: '0.61m',
      maximum: '0.79m',
    },
    classification: 'Seed Pokémon',
    types: ['Grass', 'Poison'],
    resistant: ['Water', 'Electric', 'Grass', 'Fighting', 'Fairy'],
    attacks: {
      fast: [
        {
          name: 'Tackle',
          type: 'Normal',
          damage: 12,
        },
        {
          name: 'Vine Whip',
          type: 'Grass',
          damage: 7,
        },
      ],
      special: [
        {
          name: 'Power Whip',
          type: 'Grass',
          damage: 70,
        },
        {
          name: 'Seed Bomb',
          type: 'Grass',
          damage: 40,
        },
        {
          name: 'Sludge Bomb',
          type: 'Poison',
          damage: 55,
        },
      ],
    },
    weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'],
    fleeRate: 0.1,
    maxCP: 951,
    evolutions: [
      {
        id: 'UG9rZW1vbjowMDI=',
        number: '002',
        name: 'Ivysaur',
        weight: {
          minimum: '11.38kg',
          maximum: '14.63kg',
        },
        height: {
          minimum: '0.88m',
          maximum: '1.13m',
        },
        evolutionRequirements: {
          amount: 25,
          name: 'Bulbasaur candies',
        },
        maxHP: 1071,
        image: 'https://example.com/image002.png',
      },
    ],
    evolutionRequirements: {
      amount: 25,
      name: 'Bulbasaur candies',
    },
    maxHP: 981,
    image: 'https://example.com/image001.png',
  },
  {
    id: 'UG9rZW1vbjowMDI=',
    number: '002',
    name: 'Ivysaur',
    weight: {
      minimum: '11.38kg',
      maximum: '14.63kg',
    },
    height: {
      minimum: '0.88m',
      maximum: '1.13m',
    },
    classification: 'Seed Pokémon',
    types: ['Grass', 'Poison'],
    resistant: ['Water', 'Electric', 'Grass', 'Fighting', 'Fairy'],
    attacks: {
      fast: [
        {
          name: 'Razor Leaf',
          type: 'Grass',
          damage: 13,
        },
        {
          name: 'Vine Whip',
          type: 'Grass',
          damage: 7,
        },
      ],
      special: [
        {
          name: 'Solar Beam',
          type: 'Grass',
          damage: 180,
        },
        {
          name: 'Power Whip',
          type: 'Grass',
          damage: 70,
        },
        {
          name: 'Sludge Bomb',
          type: 'Poison',
          damage: 55,
        },
      ],
    },
    weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'],
    fleeRate: 0.07,
    maxCP: 1483,
    evolutions: [],
    evolutionRequirements: {
      amount: 100,
      name: 'Ivysaur candies',
    },
    maxHP: 1552,
    image: 'https://example.com/image002.png',
  },
];
