// paste in your code from addBooksModal.js created in phase 2
class AddBooksModal extends Library {
  constructor() {
    super();
    this.$container = $('#add-books-modal');
    // console.log(this.$container);
    this.queueArray = [];
  }

  init() 
  {
    this._bindEvents();
    // this.addBooksToLibrary();
    // this.handleEventTrigger('objUpdate', window.bookShelf);
  };
  //  CHECKOUT serialize()
  _bindEvents() 
  {
    $("#add-books-modal form").on("submit", $.proxy(this.addBooksToQue, this));

    this.$container.find("#add-books-button").on("click", this.addBooksToLibrary.bind(this));
    
    this.$container.find('#cover-add-input').change($.proxy(this._handleImageUpload, this));
    // this.$container.find('#addBookCoverImage').attr('src', 'assets/covers/generic_cover.png')
    
  };

    async addBooksToLibrary() 
    {
      await this.firePost({books: this.queueArray})
      await this._runGet();

      // window.bookShelf = bookify(myBooks.books);
      // this.queueArray = bookify(myBooks.books)
      
      // this.handleEventTrigger('objUpdate', window.bookShelf)
      
      
      // this.queueArray.length = 0;
      console.log(window.bookShelf)
      
      $("#add-books-modal form")[0].reset()
      this.queueArray.length = []
      this.$container.find("#add-books-counter").html('');
    }



  addBooksToQue(e) 
  {
    e.preventDefault();
    console.log('ready to add');

    var addToQue = {};

    $("#add-books-modal").find('form').find("input, textarea").each(function () {
      if (this.name === 'cover') {
        addToQue[this.name] = $('#addBookCoverImage').attr('src');
      } else {
        addToQue[this.name] = $(this).val();
      }
    });

    this.queueArray.push(addToQue);
    this.$container.find("#add-books-counter").text(this.queueArray.length);
    this.$container.find('#addBookCoverImage').attr('src', 'assets/covers/generic_cover.png')
    $(".clearfix")[0].reset();

  }


  _handleImageUpload() 
  {
    var preview = document.querySelector('#addBookCoverImage');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      preview.src = reader.result;
    }, false);

    if (file) {
      return reader.readAsDataURL(file);
    }
  };
}

$(() => 
{
  window.gAddBooksModal = new AddBooksModal();
  gAddBooksModal.init();
});

// Bunch of things that may be needed
// var serializedBooksOne = this.queueArray
// var serializedBooks = $.param(serializedBooksOne)
// console.log(serializedBooks)
// Working on data submission

// document.getElementById('addBookCoverImage').src
// $('#addBookCoverImage').attr('src');
// if (this.name === 'cover') {
//   addToQue[this.name] = document.getElementById('addBookCoverImage').src;
// } else if (this.name === 'cover') {
//   addToQue[this.name] = $('addBookCoverImage').src('assets/covers/generic_cover.png');
// } else if ($(this).val()) {
//   addToQue[this.name] = $(this).val();
// } else {
// console.log('Error gathering input fields')

// URL encoded
// var recursiveEncoded = $.param(addToQue)
// console.log(recursiveEncoded)
// this.firePost(recursiveEncoded)
// URL encoded

// console.log(addToQue);
// console.log(this.queueArray);

// Use this version of the _handleImageUpload feel free to change the body of the function to meet your needs\
//Use the function below to add cover art as a base64 encoded string
//https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
//If you get stuck reference the documents in the link above
