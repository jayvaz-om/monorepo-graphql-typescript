import { Pokemon, QueryPokemonArgs, QueryPokemonsArgs, Resolvers } from './__generated__/schema';
import { pokedex } from './data';

// Resolvers define the technique for fetching the types defined in the schema.
export const resolvers: Resolvers = {
  Query: {
    pokemon: async (_parent, args: QueryPokemonArgs, _contextValue, _info): Promise<Pokemon> => {
      return pokedex.filter((p) => p.number === args.id).pop() as Pokemon;
    },
    pokemons: async (_parent, _args: QueryPokemonsArgs, _contextValue, _info): Promise<Pokemon[]> => {
      return pokedex;
    },
  },
};
