class RemoveBooksModal extends Library {
  constructor() {
    // Library.call(this); //resets context
    super();
    this.$container = $('#remove-books-modal');
    this.url = 'http://127.0.0.1:3001/library'
    // console.log(this.$container);
  }

  init() {
    this._bindEvents();
  }

  _bindEvents() {
    const _self = this.$container;
    $("#remove-book-button").on("click", $.proxy(this.removeBooksFromLibrary, this));

  }

  
  deleteByAuthor(author) {
    return fetch(`${this.url}/deletebyauthor/${author}`, {
      method: 'delete'
    }).then(response =>
      response.json().then(json => {
        return json;
      })
    );
  }

  deleteByTitle(title) {
    return  fetch(`${this.url}/deletebytitle/${title}`, {
      method: 'delete'
    }).then(response => 
      response.json().then(json => {
        return json;
      })
      )
  }

  removeBooksFromLibrary() {
    const titleRemove = $('#title-remove-input').val();
    const authorRemove = $('#author-remove-input').val();
    this.deleteByAuthor(authorRemove)
    this.deleteByTitle(titleRemove)
    
    // $("#removeBooksForm")[0].reset(),
    // Add if statements later
    // this.delByAuthor()

    this.removeBookByTitle(titleRemove);
    this.removeBookByAuthor(authorRemove);
    $('#remove-book-button').closest('form')[0].reset();
    this.handleEventTrigger('objUpdate', window.bookShelf);
    console.log("This is the value of title", titleRemove);
    console.log("This is the value of author", authorRemove);
    console.log("book has been removed");
  }
}

//Creates new library object
// RemoveBooksModal.prototype = Object.create(Library.prototype);






//HINT: Each class||object will need a new instance to be initalized on document ready!
$(() => {
  window.gRemoveBooksModal = new RemoveBooksModal();
  gRemoveBooksModal.init();
});