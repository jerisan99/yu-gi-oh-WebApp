import View from './View.js';

import icons from 'url:../../img/icons.svg'; //Parcel 2
import { Fraction } from 'fractional';

class RecipeView extends View {
  /**
   * Repräsentiert die Rezeptansicht.
   */

  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We couldn not find that recipe. Please try another one.';
  _message = '';

   /**
   * Fügt einen Handler hinzu, um das Rendern des Rezepts zu verwalten.
   * @param {Function} handler - Der Handler, der das Rendern des Rezepts verwaltet.
   */
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  /**
   * Generiert das Markup für das Rezept.
   * @return {string} Das generierte HTML-Markup.
   */
  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.name}" class="recipe__img" />
      </figure>
  
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.atk}</span>
          <span class="recipe__info-text">ATK</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.def}</span>
          <span class="recipe__info-text">DEF</span>
        </div>
  
        <div class="recipe__user-generated">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-minus-circle"></use>
        </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
          <h2 class="heading--2">Status</h2>
          <ul class="recipe__ingredient-list">
          <li class="recipe__ingredient">
                <div class="recipe__quantity">
                  <div>
                    Type: 
                    ${this._data.type}
                    <br>
                    Price:
                    ${this._data.price}
                  </div>
                  <div>
                    Archetype:
                    ${this._data.archetype}
                    <br>
                    Level:
                    ${this._data.level}  
                  </div>
              </div >
              </li >
              </ul>
        </div>
      `;
  }


}

export default new RecipeView();
