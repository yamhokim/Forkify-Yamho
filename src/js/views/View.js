import icons from 'url:../../img/icons'; // Method of importing static assets for Parcel 2

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create a markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render is false, default return is nothing
   * @this {Object} View instance
   * @author Yoonho Kim
   * @todo Finish implementation
   */
  render(data, render = true) {
    // Check if the data actually exists
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._changeMarkup('afterbegin', markup);
  }

  // Algorithm for updating the DOM
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Convert the newMarkup string into a DOM element
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*')); // Contains all new DOM elements, can be used to compare
    const currentELements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    // Find whatever's different between the old markup and newMarkup and only update those elements
    newElements.forEach((newElement, i) => {
      const currentELement = currentELements[i];
      // console.log(currentELement, newElement.isEqualNode(currentELement));

      // First check if the node has changed, and then check if it is a text node, since this is what we change
      // This is block will update changed text
      if (
        !newElement.isEqualNode(currentELement) &&
        newElement.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log(`😭 ${newElement.firstChild.nodeValue.trim()}`); FOR TESTING
        currentELement.textContent = newElement.textContent;
      }

      // This if block will update changed attributes
      if (!newElement.isEqualNode(currentELement)) {
        // console.log(Array.from(newElement.attributes));  FOR TESTING
        // console.log(newElement.attributes);  FOR TESTING
        Array.from(newElement.attributes).forEach(attribute =>
          currentELement.setAttribute(attribute.name, attribute.value)
        );
      }
    });
  }

  _changeMarkup(orientation, markup) {
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML(orientation, markup);
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `;

    this._changeMarkup('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
    this._changeMarkup('afterbegin', markup);
  }

  renderMessage(message = this._successMessage) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._changeMarkup('afterbegin', markup);
  }
}
