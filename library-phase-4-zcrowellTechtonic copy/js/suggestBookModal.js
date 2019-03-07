class SuggestBooksModal extends Library {
  constructor() {
    // Library.call(this); //resets context
    super();
    this.$container = $("#book-display-modal");
    // console.log(this.$container);
  }

  init() {
    this._bindEvents();
  }

  _bindEvents() {
    $('#random-book-button').on("click", $.proxy(this.suggestRandomBook, this));
    this.$container.find('div.modal-footer > button').on('click', () => {
      $(".suggest-cover").empty();
    })
    // $("#show-all-books-button").on("click", $.proxy(this.showBooks, this));
  }

  suggestRandomBook() {
    const randomBookCover = $('#book-display-modal .suggest-cover');
    $('#book-display-modal').modal('show')
    let randomBook = this.getRandomBook();
    const image = document.createElement('img');
    image.src = randomBook.cover;
    image.style = 'height: 300px';
    randomBookCover.html(image);

    this.$container.find('.suggest-synopsis').text(randomBook.synopsis);
    this.$container.find('.modal-title').text(`${randomBook.title} by ${randomBook.author}`);
    this.$container.find('.suggest-numberOfPages').text(`${randomBook.numberOfPages} pages`);
    this.$container.find('.suggest-publishDate').text(`Publication Date: ${randomBook.publishDate}`);
    this.$container.find('.suggest-rating').html(this._stars(randomBook.rating));

  }

  _stars(rating) {
    var $div = $('<div>');
    for (let i = 0; i < 5; i++) {
      const $star = $('<span>').addClass('fa fa-star');
      if (i < rating) {
        $star.addClass('checked');
      }
      $div.append($star);
    }
    return $div;
  };


  getAllBooks() {
    const bookAuthorList = this.getAuthors();
    for (let i = 0; i < bookAuthorList.length; i++) {
      this.$container.find('#author-display-ul').append(`${bookAuthorList[i].author}`);
      // $('#author-display-ul').text( bookAuthorList[i].author);
      this.$container.find('.modal-title').text('All Unique Authors In The Library');
      // $('#author-display-ul').empty();
    }
  }
}


$(() => {
  window.gSuggestBooksModal = new SuggestBooksModal();
  gSuggestBooksModal.init();
});
