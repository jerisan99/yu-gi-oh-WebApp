import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable'; //Rückwärtskompatibilität zu älteren Browsern
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

window.onload = async function() {
  /**
  * Initialisiert die API beim Laden der Seite.
  * @return {Promise<void>}
  */
  await model.loadApi();
}

const controlRecipes = async function () {
  /**
   * Kontrolliert das Laden und Anzeigen von Rezepten basierend auf der ID im URL.
   * @return {Promise<void>}
   */
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);
   
    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  }
  catch (err) {
    recipeView.renderError();
  }
};

const controlerSearchResults = async function () {
  /**
   * Kontrolliert die Suche und Anzeige von Suchergebnissen basierend auf der Benutzereingabe.
   * @return {Promise<void>}
   */

  try {
    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();


    // 2) load search results
    await model.loadSearchResults(query);

    // 3) render results
    resultsView.render(model.getSearchResultsPage());

    // 4) render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  /**
   * Kontrolliert die Anzeige der Paginierungs-Schaltflächen.
   * @param {number} goToPage - Die Seite, zu der navigiert werden soll.
   */
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlAddRecipe = async function (newRecipe) {
  /**
   * Kontrolliert das Hinzufügen eines neuen Rezepts.
   * @param {Object} newRecipe - Das hinzuzufügende Rezept.
   * @return {Promise<void>}
   */
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();


  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  /**
   * Initialisiert alle Handler für die verschiedenen Anzeigen und Funktionen.
   */
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlerSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
