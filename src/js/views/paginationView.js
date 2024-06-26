import View from './View.js';
import icons from 'url:../../img/icons'; // Method of importing static assets for Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateNextButton(currPage) {
    return `
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}.svg#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _generatePrevButton(currPage) {
    return `
      <button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>
    `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Scenario 1: Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateNextButton(currPage);
    }

    // Scenario 2: Last page
    if (currPage === numPages && numPages > 1) {
      return this._generatePrevButton(currPage);
    }

    // Scenario 3: Other page
    if (currPage < numPages) {
      return `
        ${this._generatePrevButton(currPage)}
        ${this._generateNextButton(currPage)}
      `;
    }

    // Scenario 4: Page 1, and there are no other pages
    return '';
  }
}

export default new PaginationView();
