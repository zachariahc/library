class Library {
  constructor() {
    this.url = 'http://127.0.0.1:3001';


  }

  async handleEventTrigger(sEvent, oData) {
    if (sEvent) {
      let event = new CustomEvent(sEvent, {
        'detail': oData
      });
      document.dispatchEvent(event);
    }
  }


     firePost(formData) {
       return fetch('http://127.0.0.1:3001/library', {
           headers: {
             "Content-Type": "application/json"
           },
           method: 'POST',
           body: JSON.stringify(formData)
         })
         .then(res => res.json())
         .then(res => res)
         .catch(err => console.log(err, 'Error posting'))

     }

    //  deleteByAuthor(formData) {
    //   return fetch('http://127.0.0.1:3001/library/:author', {
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       method: 'DELETE',
    //       body: JSON.stringify(formData)
    //     })
    //     .then(res => res.json())
    //     .then(res => res)
    //     .catch(err => console.log(err, 'Error posting'))

    // }

    // deleteByAuthor(item, url) {
    //   return fetch('http://127.0.0.1:3001/library/:author', {
    //     method: 'delete'
    //   }).then(response =>
    //     response.json().then(json => {
    //       return json;
    //     })
    //   );
    // }


  _runGet() {
    return fetch(`${this.url}/library/paginate/${window.currentPage}/${window.numResults}`)
      // .then(console.log(res))
       .then(res => res.json())
      // .then(res => res)
       .then((res => {
                     window.bookShelf = bookify(res.books)
                     window.totalPages = Math.ceil(res.count / window.numResults)
                    //  this.handleEventTrigger('updatePageDisplay')
                     this.handleEventTrigger('objUpdate', window.bookShelf)
                     }))
                     .catch(err => console.log(err, 'Error fetching'))
  };




  // async _getPaginate(){
  //   return await fetch('http://127.0.0.1:3001/library/paginate/1/5', {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     // .then(console.log(res))
  //     .then(res => res.json())
  //     // .then(res => res)
  //     .then(res => window.bookShelf = bookify(res.books))
  //     .catch(err => console.log(err, 'Error fetching'))
  // }

    // async loadBooks() {
    //   var response;
    //   response = await this._runGet();
    //   console.log(response.books)
    //   window.bookShelf = bookify(response.books);

    //   console.log(window.bookShelf);
    //   this._makeTable(window.bookShelf);
    // }
 
  addBook(book) {
    for (let i = 0; i < window.bookShelf.length; i++) {
      if (book.title.toLowerCase().trim() === window.bookShelf[i].title.toLowerCase().trim()) {
        console.log(`Sorry ${book.title} already exists.`);
        return false;
      }
    }
    console.log(`added ${book.title} to book shelf`);
    window.bookShelf.push(new Book(book));
    return true;
  }

  removeBookByTitle(title) {
    console.log(window.bookShelf.length);
    console.log(title);
    for (let i = 0; i < window.bookShelf.length; i++) {
      if (window.bookShelf[i].title.toLowerCase() === title.toLowerCase()) {
        console.log(`removed ${window.bookShelf[i].title} from book shelf`);
        window.bookShelf.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  removeBookByAuthor(author) {
    let booksRemoved = false;
    for (let i = window.bookShelf.length - 1; i >= 0; i--) {
      if (window.bookShelf[i].author.toLowerCase() === author.toLowerCase()) {
        console.log(`removed ${window.bookShelf[i].author} from book shelf`);
        window.bookShelf.splice(i, 1);
        booksRemoved = true;

      }
    }

    return booksRemoved;
  }

  getRandomBook() {
    if (window.bookShelf.length) {
      return window.bookShelf[Math.floor(Math.random() * Math.floor(window.bookShelf.length))];
    }

    return null;
  }

  getBookByTitle(title) {
    const matchedArr = [];
    for (let i = 0; i < window.bookShelf.length; i++) {
      if (window.bookShelf[i].title.toLowerCase().search(title.toLowerCase()) >= 0) {
        matchedArr.push(window.bookShelf[i]);
      }
    }
    return matchedArr;
  }

  getBooksByAuthor(authorName) {
    const matchedArr = [];
    for (let i = 0; i < window.bookShelf.length; i++) {
      if (window.bookShelf[i].author.toLowerCase().search(authorName.toLowerCase()) >= 0) {
        matchedArr.push(window.bookShelf[i]);
      }
    }
    return matchedArr;
  }

  addBooks(books) {
    let counter = 0;
    for (let i = 0; i < books.length; i++) {
      if (this.addBook(books[i])) {
        counter++;
      }
    }
    return counter;
  }

  getAuthors() {
    if (window.bookShelf.length) {
      return window.bookShelf.unique("author");
    }
    return [];
  }

  getRandomAuthorName() {
    if (!window.bookShelf.length) {
      return null;
    } else {
      return window.bookShelf[Math.floor(Math.random() * Math.floor(window.bookShelf.length))].author;
    }
  }

  //remove below code and implement your own search function

  //TODO: ADD YOUR OWN SEARCH FUNCTION HERE
  search(searchParamsObj) {
    let searchResults = [];
    if (searchParamsObj.title) {
      searchResults = searchResults.concat(this.getBookByTitle(searchParamsObj.title))
    }
    if (searchParamsObj.author) {
      searchResults = searchResults.concat(this.getBooksByAuthor(searchParamsObj.author))
    }
    searchResults = searchResults.unique("title");
    return searchResults
  };

  getStorage() {
    const arr = [];
    const parsedObj = JSON.parse(localStorage.getItem("myLibrary"));
    for (let i = 0; i < parsedObj.length; i++) {
      arr.push(new Book(parsedObj[i]));
    }
    return arr;
  }

  setStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(window.bookShelf));
    return console.log("STORAGE HAS BEEN SET");
  }

}


