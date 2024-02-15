class SearchView {
    _parentEl = document.querySelector('.search');

    getQuery() {
        const query = this._parentEl.querySelector('.search__field').value;
        const queryLow = query.toLowerCase();
        this._clearInput();
        return queryLow;
    }

    _clearInput() {
        this._parentEl.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        })
    }

}

export default new SearchView(); //Objekt und nicht Klasse!