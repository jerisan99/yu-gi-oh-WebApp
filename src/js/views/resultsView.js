import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends View {
  /**
   * @typedef {Object} Result
   * @property {string} id
   * @property {string} name
   * @property {number} price
   * @property {string} image
   * Repräsentiert die Ansicht für die Suchergebnisse.
   */

    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query! Please try again ;)';
    _message = '';

    _generateMarkup() {
        /**
       * Generiert das Markup für die Suchergebnisse.
       * @return {string} Das generierte HTML-Markup.
       */
        return this._data.map(this._generateMarkupPreview).join('');
    }

    _generateMarkupPreview(result) {
        /**
         * Generiert das Markup für eine einzelne Suchergebnisvorschau.
         * @param {Result} result - Das Suchergebnis, für das das Markup generiert werden soll.
         * @return {string} Das generierte HTML-Markup.
         */
        return `
         <li class="preview">
            <a class="preview__link" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.name}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.name}</h4>
                <p class="preview__publisher">Price: ${result.price}</p>
              </div>
            </a>
          </li>
        `;
    }
}

export default new ResultsView();
