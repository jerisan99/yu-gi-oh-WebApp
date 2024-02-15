import { async } from 'regenerator-runtime/runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  /**
   * @typedef {Object} Recipe
   * @property {string} id
   * @property {string} name
   * @property {number} price
   * @property {string} image
   * @property {string} type
   * @property {string} archetype
   * @property {string} race
   * @property {number} atk
   * @property {number} def
   * @property {number} level
   */
  recipe: {},
  cards: [],
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadApi = async function () {
  /**
   * Lädt API-Daten und speichert sie in `state.cards`.
   * @return {Promise<void>}
   */
  const res = await fetch(`${API_URL} `);
  const cardsData = await res.json();
  state.cards = cardsData.data;    
};

export const loadRecipe = async function (id) {
  /**
   * Lädt ein Rezept basierend auf der gegebenen ID und speichert es in `state.recipe`.
   * @param {string} id - Die ID des zu ladenden Rezepts.
   * @return {Promise<void>}
   */

  try {
    for (let i = 0; i < state.cards.length; i++) {
    
      if (state.cards[i].id.toString().toLowerCase() === id) {
        state.recipe = {
          id: state.cards[i].id,
          name: state.cards[i].name,
          price: state.cards[i].card_prices[0].cardmarket_price,
          image: state.cards[i].card_images[0].image_url,
          type: state.cards[i].type,
          archetype: state.cards[i].archetype,
          race: state.cards[i].race,
          atk: state.cards[i].atk,
          def: state.cards[i].def,
          level: state.cards[i].level
        };
        break;
      }
    }
  } catch (err) {
    console.error('Error while loading recipe:', err);  // Debug: Log any error that occurs
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  /**
   * Lädt Suchergebnisse basierend auf der gegebenen Abfrage und speichert sie in `state.search.results`.
   * @param {string} query - Die Suchabfrage.
   * @return {Promise<void>}
   */
  try {
    state.search.query = query;
    state.search.results = []; // Initialize as an empty array

    for (let i = 0; i < state.cards.length; i++) {
      if (state.cards[i].name.toLowerCase().includes(query)) {
        state.search.results.push({
          id: state.cards[i].id,
          name: state.cards[i].name,
          price: state.cards[i].card_prices[0].cardmarket_price,
          image: state.cards[i].card_images[0].image_url_cropped
        });
      }
    }
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  /**
   * Gibt eine Seite von Suchergebnissen zurück.
   * @param {number} [page=state.search.page] - Die Seite der Suchergebnisse, die zurückgegeben werden soll.
   * @return {Array<Recipe>} Eine Seite von Suchergebnissen.
   */
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

export const uploadRecipe = async function (card) {
  /**
   * Lädt ein neues Rezept hoch und speichert es in `state.recipe`.
   * @param {Recipe} card - Das hochzuladende Rezept.
   * @return {Promise<void>}
   */
  try {
      const recipe = {
        name: card.name,
        price: card.price,
        image: card.image,
        type: card.type,
        archetype: card.archetype,
        race: card.race,
        atk:  card.atk,
        def:  card.def,
        level:  card.level
      };
      console.log(recipe.name);
      const data = await fetch(`${API_URL}`, recipe);
  } catch (err) {
      throw err;
  }
};