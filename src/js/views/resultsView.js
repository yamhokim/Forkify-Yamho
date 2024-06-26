import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Method of importing static assets for Parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again 🙂';
  _successMessage = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
