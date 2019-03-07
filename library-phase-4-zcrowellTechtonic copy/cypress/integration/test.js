var fast = {delay: 0}; //saved several seconds on overall testing by adding this option to the type method it defaults to 10ms

describe('Empty database and Load page', function(){
  it('navigate to page', function(){
    cy.request({
      url:'http://127.0.0.1:3001/library/removeAll',
      method:"DELETE"
    });
    cy.visit('http://127.0.0.1:5500/');
  });
});

describe('addBooksModal functionality', function(){
  context('Queueing and adding a single book',function(){
    it('Open addBook Modal',function(){
      cy.get('#addBooksModalBtn').click();
      cy.get('#add-books-modal').should('have.class','modal fade in');
    });
    it('Check queueing a book', function(){
      cy.get('#title-add-input').type("Harry Potter",fast);
      cy.get('#author-add-input').type("JK Rowling",fast);
      cy.get('#rating-add-input').type("5",fast);
      cy.get('#pages-add-input').type("250",fast);
      cy.get('#date-add-input').type("2001-03-17",fast); //yyyy-MM-dd
      cy.get('#synopsis-add-input').type("Delusional boy dreams up a fake reality while trapped under a cupboard.",fast);
      //cy.get('#cover-add-input') //eventually include file upload support
      cy.get('#queue-book-button').click();
    });
    it('Check books ready to add ui element for updated count',function(){
      cy.get('#add-books-counter').should('have.text','1');
    });
    it('Check Queue Book Array for recently added object',function(){
      cy.window().then((win) => {
        expect(win.gAddBooksModal.queueArray[0]).to.deep.equal({author: "JK Rowling",
        cover: "assets/covers/generic_cover.png",
        numberOfPages: "250",
        publishDate: "2001-03-17",
        rating: "5",
        synopsis: "Delusional boy dreams up a fake reality while trapped under a cupboard.",
        title: "Harry Potter"});
      });
    });
    it('Checking for emptied input fields',function(){
      cy.get('#title-add-input').should('have.value','');
      cy.get('#author-add-input').should('have.value','');
      cy.get('#rating-add-input').should('have.value','');
      cy.get('#pages-add-input').should('have.value','');
      cy.get('#date-add-input').should('have.value','');
      cy.get('#synopsis-add-input').should('have.value','');
    });
    it('Add bookQueue to the bookShelf',function(){
      cy.get('#add-books-button').click();
      cy.wait(500)
    });
    it('Check for reset queue',function(){
      cy.window().then((win) => {
        expect(win.gAddBooksModal.queueArray.length).to.equal(0);
      });
    });
    it('Checking bookShelf to make sure newly added book was added to the bookShelf',function(){
      // cy.pause();
      cy.window().then((win) => {
        expect(win.bookShelf.length).to.equal(1);
      });
    });
    it('Checking bookShelf to make sure newly added book has correct properties, data types, values and is an instance of the Book class',function(){
      cy.window().then((win) => {
        checkBook(win.bookShelf[0]); //this checkBook helper function shown at bottom of this file checks all relevent information on a book object
      });
    });
    it('Check for modal closed condition',function(){
    cy.get('body').should('have.class','');
    cy.get('#add-books-modal').should('have.class','modal fade')
    });
    it('Check to make sure newly added book has been added to the data table',function(){
      cy.get('#books-table > tr > :nth-child(2)').should('have.text','Harry Potter');
      cy.get('#books-table > tr > :nth-child(3)').should('have.text','JK Rowling');
      cy.get('#books-table > tr > :nth-child(4)').should('have.text','250');
      cy.get('#books-table > tr > :nth-child(5)').should('have.text','Delusional boy dreams up a fake reality while trapped under a cupboard....');
      cy.get('#books-table > tr > :nth-child(6)').should('have.text','2001');
      cy.get('tr > :nth-child(7) > div').children().should('have.length',5); //check star count
      cy.get('#books-table > tr > :nth-child(8) > button').should('exist');
      cy.get('#books-table > tr > :nth-child(8) > button').should('have.text','Edit Book');
      cy.get('#books-table > tr > :nth-child(9) > input').should('exist'); //check for input checkbox to exist
    });
  });
  context('Queueing and adding multiple books',function(){
    before(function(){ //loads queue with first book skipping several checks that are already confirmed as working
      cy.reload(); //fastest way to revitalize fresh conditions HACKISH remove if localStorage or persistant data is used
      cy.request({
        url:'127.0.0.1:3001/library/removeAll',
        method:"DELETE"
      });
      cy.get('#addBooksModalBtn').click();
      cy.get('#title-add-input').type("Harry Potter and the Sorcerer's Stone",fast);
      cy.get('#author-add-input').type("JK Rowling",fast);
      cy.get('#rating-add-input').type("5",fast);
      cy.get('#pages-add-input').type("250",fast);
      cy.get('#date-add-input').type("2001-03-17",fast); //yyyy-MM-dd
      cy.get('#synopsis-add-input').type("Delusional boy dreams up a fake reality while trapped under a cupboard.",fast);
      cy.get('#queue-book-button').click();
    });
    it('Check adding a second book to the queue',function(){
      cy.get('#title-add-input').type("Harry Potter and the Chamber of Secrets",fast);
      cy.get('#author-add-input').type("JK Rowling",fast);
      cy.get('#rating-add-input').type("2",fast);
      cy.get('#pages-add-input').type("300",fast);
      cy.get('#date-add-input').type("2002-03-17",fast); //yyyy-MM-dd
      cy.get('#synopsis-add-input').type("Delusional boy dreams up a fake reality WITH SNAKES while trapped under a cupboard.",fast);
      cy.get('#queue-book-button').click();
      cy.get('#add-books-counter').should('have.text','2');
    });
    it('Check adding a third book to the queue',function(){
      cy.get('#title-add-input').type("IT",fast);
      cy.get('#author-add-input').type("Stephen King",fast);
      cy.get('#rating-add-input').type("4",fast);
      cy.get('#pages-add-input').type("320",fast);
      cy.get('#date-add-input').type("1995-03-17",fast); //yyyy-MM-dd
      cy.get('#synopsis-add-input').type("Clown makes red balloon animals and eats the customers.",fast);
      cy.get('#queue-book-button').click();
      cy.get('#add-books-counter').should('have.text','3');
    });
    it('Check adding a fourth book to the queue',function(){
      cy.get('#title-add-input').type("Cujo",fast);
      cy.get('#author-add-input').type("Stephen King",fast);
      cy.get('#rating-add-input').type("5",fast);
      cy.get('#pages-add-input').type("500",fast);
      cy.get('#date-add-input').type("1989-03-17",fast); //yyyy-MM-dd
      cy.get('#synopsis-add-input').type("Basically Beethoven but with more rabies.",fast);
      cy.get('#queue-book-button').click();
      cy.get('#add-books-counter').should('have.text','4');
    });
    it('Check adding a fifth book to the queue',function(){
      cy.get('#title-add-input').type("A Song of Ice and Fire",fast);
      cy.get('#author-add-input').type("George R. R. Martin",fast);
      cy.get('#rating-add-input').type("3",fast);
      cy.get('#pages-add-input').type("694",fast);
      cy.get('#date-add-input').type("1997-03-17",fast); //yyyy-MM-dd
      cy.get('#synopsis-add-input').type("Author sets out to create the world's most complicated family tree.",fast);
      cy.get('#queue-book-button').click();
      cy.get('#add-books-counter').should('have.text','5');
    });
    it('Check Queue Book Array for all added objects',function(){
      cy.window().then((win) => {
        expect(win.gAddBooksModal.queueArray[0]).to.deep.equal({author: "JK Rowling",
        cover: "assets/covers/generic_cover.png",
        numberOfPages: "250",
        publishDate: "2001-03-17",
        rating: "5",
        synopsis: "Delusional boy dreams up a fake reality while trapped under a cupboard.",
        title: "Harry Potter and the Sorcerer's Stone"});
        expect(win.gAddBooksModal.queueArray[1]).to.deep.equal({author: "JK Rowling",
        cover: "assets/covers/generic_cover.png",
        numberOfPages: "300",
        publishDate: "2002-03-17",
        rating: "2",
        synopsis: "Delusional boy dreams up a fake reality WITH SNAKES while trapped under a cupboard.",
        title: "Harry Potter and the Chamber of Secrets"});
        expect(win.gAddBooksModal.queueArray[2]).to.deep.equal({author: "Stephen King",
        cover: "assets/covers/generic_cover.png",
        numberOfPages: "320",
        publishDate: "1995-03-17",
        rating: "4",
        synopsis: "Clown makes red balloon animals and eats the customers.",
        title: "IT"});
        expect(win.gAddBooksModal.queueArray[3]).to.deep.equal({author: "Stephen King",
        cover: "assets/covers/generic_cover.png",
        numberOfPages: "500",
        publishDate: "1989-03-17",
        rating: "5",
        synopsis: "Basically Beethoven but with more rabies.",
        title: "Cujo"});
        expect(win.gAddBooksModal.queueArray[4]).to.deep.equal({author: "George R. R. Martin",
        cover: "assets/covers/generic_cover.png",
        numberOfPages: "694",
        publishDate: "1997-03-17",
        rating: "3",
        synopsis: "Author sets out to create the world's most complicated family tree.",
        title: "A Song of Ice and Fire"});
      });
    });
    it('Add bookQueue to the bookShelf and verify that each added book has values, correct data types and is an instance of the Book class',function(){
      cy.get('#add-books-button').click();
      cy.window().then((win) => {
        for (var i = 0; i < win.bookShelf.length; i++) {
          checkBook(win.bookShelf[i]);
        };
      });
    });
    it('Check to make sure newly added books have been added to the data table',function(){
      //object of arrays and for loop to prevent this table check from taking up a million lines of code
      var valueObj = {
        titleArr: ["Harry Potter and the Sorcerer's Stone",'Harry Potter and the Chamber of Secrets','IT','Cujo','A Song of Ice and Fire'],
        authorArr: ['JK Rowling','JK Rowling','Stephen King','Stephen King','George R. R. Martin'],
        synopsisArr: ['Delusional boy dreams up a fake reality while trapped under a cupboard....','Delusional boy dreams up a fake reality WITH SNAKES while trapped under a cupboard....','Clown makes red balloon animals and eats the customers....','Basically Beethoven but with more rabies....',"Author sets out to create the world's most complicated family tree...."],
        pagesArr: ['250','300','320','500','694'],
        publishDateArr: ['2001','2002','1995','1989','1997'],
        ratingArr: [5,2,4,5,3] //using these as a way to target star icon to verify if it's checked/unchecked
      };
      for (var i = 0; i < valueObj.titleArr.length; i++) {
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(2)`).should('have.text',valueObj.titleArr[i]);
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(3)`).should('have.text',valueObj.authorArr[i]);
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(4)`).should('have.text',valueObj.pagesArr[i]);
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(5)`).should('have.text',valueObj.synopsisArr[i]);
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(6)`).should('have.text',valueObj.publishDateArr[i]);
        if (valueObj.ratingArr[i] === 5) {
          cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(7) > div > :nth-child(5)`).should('have.class','fa fa-star checked');
        }else{
          cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(7) > div > :nth-child(${valueObj.ratingArr[i]+1})`).should('have.class','fa fa-star')
        };
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(8) > button`).should('exist');
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(8) > button`).should('have.text','Edit Book');
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(9) > input`).should('exist');
      };
    });
  });
});

describe('removeBooksModal functionality',function(){
  it('Check Open and Close functionality of the removeBooks Modal',function(){
    cy.get('#removeBooksModalBtn').click();
    cy.get('#remove-books-modal').should('have.class',"modal fade in");
    cy.get('#remove-books-modal > .modal-dialog > .modal-content > .modal-header > .close > span').click();
    cy.get('#remove-books-modal').should('have.class',"modal fade");
  });
  context('Remove book by title functionality',function(){
    it('Check Removing book By incomplete Title this also checks incorrect title',function(){
      cy.get('#removeBooksModalBtn').click();
      cy.get('#title-remove-input').type('Harry Potter',fast);
      cy.get('#remove-book-button').click();
      cy.wait(500); //500 millisecond wait time to handle nested requests
    cy.window().then((win) => {
      expect(win.bookShelf.length).to.equal(5);
      });
    });
    it('Check to make sure title field is cleared after attempting to remove a book',function(){
      cy.get('#title-remove-input').should('have.text',"");
    });
    it('Check Removing book by correct Title',function(){
      cy.get('#removeBooksModalBtn').click();
      cy.get('#title-remove-input').type("Harry Potter and the Sorcerer's Stone",fast);
      cy.get('#remove-book-button').click();
      cy.wait(500); //500 millisecond wait time to handle nested requests
      cy.window().then((win) => {
        expect(win.bookShelf.length).to.equal(4);
        });
    });
    it('Check that data table reflects removed book',function(){
      cy.get('#books-table > :nth-child(1) > :nth-child(2)').should('have.text','Harry Potter and the Chamber of Secrets');
    });
  });
  context('Remove book by author functionality',function(){
    it('Check removing book by incomplete author this also checks incorrect author',function(){
      cy.get('#removeBooksModalBtn').click();
      cy.get('#author-remove-input').type('Step',fast);
      cy.get('#remove-book-button').click();
      cy.wait(500); //500 millisecond wait time to handle nested requests
      cy.window().then((win) => {
        expect(win.bookShelf.length).to.equal(4);
        });
    });
    it('Check removing book by correct author',function(){
      cy.get('#removeBooksModalBtn').click();
      cy.get('#author-remove-input').type('Stephen King',fast);
      cy.get('#remove-book-button').click();
      cy.wait(500); //500 millisecond wait time to handle nested requests
      cy.window().then((win) => {
        expect(win.bookShelf.length).to.equal(2);
        });
    });
    it('Check that data table updated after removing books',function(){
      cy.get('#books-table > :nth-child(1) > :nth-child(2)').should('have.text','Harry Potter and the Chamber of Secrets');
      cy.get('#books-table > :nth-child(2) > :nth-child(2)').should('have.text','A Song of Ice and Fire');
    });
  });
});

describe('Show All Authors Functionality',function(){
  before(function(){//populating bookShelf with a duplicate author to test unique listing of authors
    cy.window().then((win)=>{
      var addBook = win.gAddBooksModal.addBook;
      addBook({author: "George R. R. Martin",
      numberOfPages: "694",
      publishDate: "1997-03-17",
      rating: "3",
      synopsis: "Author attempts to set a record for killing off as many characters as possible.",
      title: "A Clash of Kings"});
    });
  });
  it('Check that modal is open after clicking Show All Authors button',function(){
     cy.get('#show-authors-button').click();
     cy.get('#author-display-modal').should('have.class','modal fade in');
  });
  it('Check that opened modal has correct number of list items displayed',function(){
    cy.get('#author-display-ul').children().should('have.length',2);
    cy.get('#author-display-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click();
  });
  it('Check that opened modal has correct title shown',function(){
    cy.get('#show-authors-button').click();
    cy.get('#author-display-modal > .modal-dialog > .modal-content > .modal-header > .modal-title').should('have.text','All Unique Authors In The Library');
    cy.get('#author-display-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click();
  })
  it('Check that modal properly resets with each time the modal is closed and reopened',function(){
    //testing three different ways to close the modal to make sure each way still results in a reset of list items
    cy.get('#show-authors-button').click();
    cy.get('#author-display-ul').children().should('have.length',2);
    cy.get('#author-display-modal > .modal-dialog > .modal-content > .modal-header > .close > span').click();
    cy.get('#show-authors-button').click();
    cy.get('#author-display-ul').children().should('have.length',2);
    cy.get('#author-display-modal').click('right'); //this click happens outside of the modal body we expect it to close the modal
    cy.get('#show-authors-button').click();
    cy.get('#author-display-ul').children().should('have.length',2);
    cy.get('#author-display-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click();
  });
});

describe('Random Author Functionality',function(){
  it('Check that modal is open after clicking the Random Author button',function(){
     cy.get('#random-author-button').click();
     cy.get('#author-display-modal').should('have.class','modal fade in');
  });
  it('Check that a single random author is shown within the modal',function(){
    cy.get('#author-display-ul').children().should('have.length',1);
    cy.get('li').then((li)=>{
      expect(li[0].innerHTML).to.be.oneOf(['JK Rowling','George R. R. Martin']);
      cy.get('#author-display-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click();
    });
  });
  it('Check that opened modal has correct title shown',function(){
    cy.get('#random-author-button').click();
    cy.get('#author-display-modal > .modal-dialog > .modal-content > .modal-header > .modal-title').should('have.text','Here Is Your Random Author');
    cy.get('#author-display-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click();
  })
  it('Check that modal properly resets with each time the modal is closed and reopened',function(){
    //testing three different ways to close the modal to make sure each way still results in a reset of list items
    cy.get('#random-author-button').click();
    cy.get('#author-display-ul').children().should('have.length',1);
    cy.get('#author-display-modal > .modal-dialog > .modal-content > .modal-header > .close > span').click();
    cy.get('#random-author-button').click();
    cy.get('#author-display-ul').children().should('have.length',1);
    cy.get('#author-display-modal').click('right'); //this click happens outside of the modal body we expect it to close the modal
    cy.get('#random-author-button').click();
    cy.get('#author-display-ul').children().should('have.length',1);
    cy.get('#author-display-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click();
  });
});

describe('Suggest Book Functionality',function(){
  it('Check that modal is open after clicking the Suggest Book button',function(){
     cy.get('#random-book-button').click();
     cy.get('#book-display-modal').should('have.class','modal fade in');
     cy.get('#book-display-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click();
  });
  it('Check that modal is correctly filled out with random book values',function(){
    cy.get('#random-book-button').click();
    cy.get('#book-display-modal > .modal-dialog > .modal-content > .modal-header > .modal-title').then((h4)=>{
      expect(h4[0].innerHTML).to.be.oneOf(['A Song of Ice and Fire by George R. R. Martin','A Clash of Kings by George R. R. Martin','Harry Potter and the Chamber of Secrets by JK Rowling'])
    });
    cy.get('.suggest-synopsis').then((p)=>{
      expect(p[0].innerHTML).to.be.oneOf(['Delusional boy dreams up a fake reality WITH SNAKES while trapped under a cupboard.',"Author sets out to create the world's most complicated family tree.","Author attempts to set a record for killing off as many characters as possible."])
    });
    cy.get('.suggest-numberOfPages').then((p)=>{
      expect(p[0].innerHTML).to.be.oneOf(['300 pages','694 pages']);
    });
    cy.get('.suggest-publishDate').then((p)=>{
      expect(p[0].innerHTML).to.be.oneOf(['Publication Date: 2002','Publication Date: 1997']);
    });
    cy.get('.suggest-rating > div').children().should('have.length',5)
  });
});

describe('Pagination functionality',function(){
  context('Checking pagination without search results',function(){
    before(function(){
      cy.request({
        url: '127.0.0.1:3001/library/',
        method: 'POST',
        body: {
          books: [{
              author: "JK Rowling",
              numberOfPages: 694,
              publishDate: "1997-03-17",
              rating: 3,
              synopsis: "A boy goes to wizard school",
              title: "Harry Potter and the Sorcerer's Stone",
              cover: "assets/covers/generic_cover.png"
            },
            {
              author: "George R. R. Martin",
              numberOfPages: 694,
              publishDate: "1997-03-17",
              rating: 3,
              synopsis: "Author sets out to create the world's most complicated family tree.",
              title: "A Song of Ice and Fire",
              cover: "assets/covers/generic_cover.png"
            },
            {
              author: "Stephen King",
              numberOfPages: 500,
              publishDate: "1989-03-17",
              rating: 5,
              synopsis: "Basically Beethoven but with more rabies.",
              title: "Cujo",
              cover: "assets/covers/generic_cover.png"
            },
            {
              author: "JK Rowling",
              numberOfPages: 694,
              publishDate: "1997-03-17",
              rating: 3,
              synopsis: "A boy goes to wizard school again",
              title: "Harry Potter and the Prisoner of Azkaban",
              cover: "assets/covers/generic_cover.png"
            },
            {
              author: "Stephen King",
              numberOfPages: 500,
              publishDate: "1989-03-17",
              rating: 5,
              synopsis: "Clown eats people.",
              title: "IT",
              cover: "assets/covers/generic_cover.png"
            },
            {
              author: "Stephen King",
              numberOfPages: 500,
              publishDate: "1989-03-17",
              rating: 5,
              synopsis: "Hours of your life are stolen by a book.",
              title: "The Mist",
              cover: "assets/covers/generic_cover.png"
            },
            {
              author: "George R. R. Martin",
              numberOfPages: 694,
              publishDate: "1997-03-17",
              rating: 3,
              synopsis: "Swords and stuff",
              title: "A Clash of Kings",
              cover: "assets/covers/generic_cover.png"
            }
          ]
        }
      });
      cy.reload();
    });
    it('Check that clicking forward button changes the page status to page 2',function(){
      // Did I mess this order for the click up?
      cy.wait(500);
      cy.get('#next').click();
      // Wait and then click. Or click and then wait?
      cy.get('#middleNum').should('have.text','Page 2 of 2');
    });
    it('Check that bookShelf has 4 books with correct keys and datatypes',function(){
      cy.window().then((win)=>{
        expect(win.bookShelf).to.have.length(4);
        for (var i = 0; i < win.bookShelf.length; i++) {
          checkBook(win.bookShelf[i]);
        };
      });
    });
    it('Check that data table has properly updated with correct book objects',function(){
      //TODO:THIS NEEDS TO BE MADE INTO A FUNCTION I JUST COPY PASTED IT FOR NOW
      //FUNCTION WILL TAKE IN A VALUE OBJ AND LOOP THE TABLE
      var valueObj = {
        titleArr: ["Harry Potter and the Prisoner of Azkaban",'IT','The Mist','A Clash of Kings'],
        authorArr: ['JK Rowling', 'Stephen King','Stephen King','George R. R. Martin'],
        synopsisArr: ['A boy goes to wizard school again...','Clown eats people....','Hours of your life are stolen by a book....','Swords and stuff...'],
        pagesArr: ['694','500','500','694'],
        publishDateArr: ['1997','1989','1989','1997'],
        ratingArr: [3,5,5,3] //using these as a way to target star icon to verify if it's checked/unchecked
      };
      for (var i = 0; i < valueObj.titleArr.length; i++) {
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(2)`).should('have.text',valueObj.titleArr[i]);
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(3)`).should('have.text',valueObj.authorArr[i]);
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(4)`).should('have.text',valueObj.pagesArr[i]);
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(5)`).should('have.text',valueObj.synopsisArr[i]);
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(6)`).should('have.text',valueObj.publishDateArr[i]);
        if (valueObj.ratingArr[i] === 5) {
          cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(7) > div > :nth-child(5)`).should('have.class','fa fa-star checked');
        }else{
          cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(7) > div > :nth-child(${valueObj.ratingArr[i]+1})`).should('have.class','fa fa-star')
        };
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(8) > button`).should('exist');
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(8) > button`).should('have.text','Edit Book');
        cy.get(`#books-table > :nth-child(${i+1}) > :nth-child(9) > input`).should('exist');
      };
    });

  });
});

//UTIL HELPER FUNCTIONS
function checkBook(obj){ 
  console.log(obj)//this function checks all relevent information on a book class object
  expect(obj).to.have.all.keys('_id','cover','title','author','synopsis','numberOfPages','publishDate','rating');
  // expect(obj.cover).to.exist; //add functionality eventually
  expect(obj._id).to.exist;
  expect(obj.title).to.exist;
  expect(obj.author).to.exist;
  expect(obj.synopsis).to.be.exist;
  expect(obj.numberOfPages).to.exist;
  expect(obj.publishDate).to.exist;
  expect(obj.rating).to.exist;
  //expect(obj.cover).to.be.a('string'); //add functionality eventually
  expect(obj._id).to.be.a('string');
  expect(obj.title).to.be.a('string');
  expect(obj.author).to.be.a('string');
  expect(obj.synopsis).to.be.a('string');
  expect(obj.numberOfPages).to.be.a('number');
  expect(obj.publishDate).to.be.a('number');
  expect(obj.rating).to.be.a('number');
  cy.window().then((win) => {
    expect(obj).to.be.instanceOf(win.Book);
  });
};
