class ShowAuthorsModal extends Library {
  constructor() {
    // Library.call(this); //resets context
    super();
    this.$container = $('#author-display-modal');
    // console.log(this.$container.html());
  }

  init() {
    this._bindEvents();
  }

  _bindEvents() {
    // const _self = this.$container;
    $("#show-authors-button").on("click", $.proxy(this.showAllAuthors, this));
    
    $("#random-author-button").on("click", $.proxy(this.getRandomAuthor, this));

    $('#author-display-modal > div > div > div.modal-footer > button').on('click', () => {
      $('#author-display-ul').html('');
    });
    $('#author-display-modal > div > div > div.modal-header > button').on('click', () => {
      $('#author-display-ul').html('');
    });
  }

  showAllAuthors() {
    const bookList = this.getAuthors(window.bookShelf);
    let randomAuth = "";
    // We need work on this
    for (let i = 0; i < bookList.length; i++) {
      randomAuth += '<li>' + `${bookList[i].author}` + '</li>'
    };
    $('#author-display-modal').modal('show');
    $('#author-display-modal h4').html('All Unique Authors In The Library');
    $('#author-display-ul').html(randomAuth);
  }

  getRandomAuthor() {
    const randomAuthor = this.getRandomAuthorName();
    // $('.modal-title').html('Here Is Your Random Author');
    // $('#author-display-ul').html(`${randomAuthor}`);
    $('#author-display-modal').modal('show')
    $('#author-display-modal .modal-title').text('Here Is Your Random Author');
    $('#author-display-ul').append(`<li id+'author-display-ul'>${randomAuthor}</li>`)

    this.$container.on('hidden.bs.modal', () => {
      $('#author-display-ul').children().remove();
    })
    // handle opening a modal to display a single random author
  }
}

//Creates new library object
// ShowAuthorsModal.prototype = Object.create(Library.prototype);





$(() => {
  window.gShowAuthorsModal = new ShowAuthorsModal();
  gShowAuthorsModal.init();
});
