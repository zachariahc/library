class DataTable extends Library {
   constructor() {
     // Library.call(this); //resets context
     super();
     this.$container = $('#data-table');
     window.currentPage = 1;
     window.numResults = 5;
   }


// LOOK AT BIND CUSTOM LISTENERS AND SEE IF THAT IS THE PROBLEM WITH THE MIDDLE NUMBER!!!

   async init() 
   {
     await this._runGet();
     this._bindEvents();
     this._bindCustomListeners();
     console.log(window.bookShelf)
   };

   _bindEvents() 
   {
     $("#previous").on("click", this.goBackward.bind(this));
     $("#next").on("click", this.goForward.bind(this));
   };

   updatePageDisplay(){
    $('#middleNum').text(`Page ${window.currentPage} of ${window.totalPages}`)
   }

   goForward(){
    if(window.currentPage === window.totalPages){
     return true;
    } else {
      window.currentPage++
      this._runGet();
    }
    console.log('This is the current page', window.currentPage)
    console.log('This is the total page count', window.totalPages)
  }

  goBackward(){
    if(window.currentPage === window.totalPages){
      window.currentPage--
      this._runGet();
    }
  }

   _bindCustomListeners() 
   {
    // This is how the page is updating on load
    $(document).on('objUpdate', $.proxy(this._updateTable, this));
    this.handleEventTrigger('objUpdate', window.bookShelf);
   };



   _handleSearch(e) 
   {
     e.preventDefault();

     var data = $(e.target).serializeArray(); //[{name: "title", value: "sometitle"}, {name: "author", value: "someauthor"}]
     console.log(data);
     var searchObj = {};
     for (let i = 0; i < data.length; i++) {
       searchObj[data[i].name] = data[i].value;
     }
     console.log(searchObj);
     this.handleEventTrigger('objUpdate', this.search(searchObj))
     $("#search-form")[0].reset()
   };

   _updateTable(e) 
   {
     this._makeTable(e.detail);
   };

   _makeTable(books) {
     // console.log(books)
     var _this = this;
     var $tbody = this.$container.find('tbody');
     $tbody.empty();
     $('#books-table-head').html(this._createHead(new Book({})));
     $.each(books, function (index, book) {
       $tbody.append(_this._createRow(book));
     });


     let pageSpan = $('#middleNum');
     let pageText = `Page ${window.currentPage} of ${window.totalPages}`;
     pageSpan.html(pageText);
   };

   _createHead(book) {
     var tr = $('<tr>');
     for (var key in book) {
       if (key === '_id') {
         //Do nothing, dont display
       } else {
         var th = $('<th>').text(spacesToCamelCase(key));
         tr.append(th);
       }
     }

     var dTH = $('<th>').text('Delete Book');
     tr.append(dTH);
     return tr;
   };

     _createRow(book) {
       // console.log(book)
       var tr = $('<tr>');
       //This created our delete column
       var deleteInput = $('<input>').attr('type', 'checkbox').prop('checked', false);
       var button = $('<button>').text('Edit Book').addClass('btn btn-default edit-book').attr('type', 'button').attr('data-toggle', 'modal').attr('data-target', '#edit-book-modal');
       for (var key in book) {
         var td = $('<td>');
         if (key === '_id') { // This takes the 8th spot on the table
           $(td).html(button);
         } else if (key === 'cover') {
           var img = $('<img>').addClass('tableImg').attr('src', book[key]);
           $(td).html(img);
         } else if (key === 'rating') {
           $(td).html(this._stars(book[key])); // This takes the 9th spot on the table
         } else if (key === 'editBook') {
           $(td).html(deleteInput);
         } else {
           // console.log(key);
           $(td).html(key === 'synopsis' ? book[key].substring(0, 85) + '...' : book[key]);
         }

         tr.append(td);
       }

       // var prevButton = $('<tr>').html(button);
       // $(prevButton).append(button);
       // tr.append(prevButton);
       return tr;
     };

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

   _updateStorage() {

   };
 }
 //This is the document ready that will create a new instance of DataTable
 //HINT: Each class||object will need a new instance to be initalized on document ready!
 $(() => {
   window.gDataTable = new DataTable();
   gDataTable.init();
 });