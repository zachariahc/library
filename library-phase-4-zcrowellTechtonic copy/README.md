# Library Project: Phase 4 (Front-end with ReST layer)

## Getting Started

Recall that you built the engine that drives your application using JavaScript in Phase 1, connected a pre-built User Interface for your digital library application to your engine with the help of jQuery in Phase 2, and created and connected a database that you can communicate with using Express and Mongoose as your middleware, jQuery Ajax calls, and ReST API endpoints in Phase 3.  Now that you have your basic CRUD routes in place for posting, getting, updating, and deleting single and multiple titles, we can expand on their complexity.  Pagination ends up breaking some of what we’ve already built, so we will tackle that as well.  As you work through the project, refrain from modifying **`index.html`**, as doing so may break some cypress tests. 

## Requirements 
Your objective during this phase is to complete the following endpoints, augmenting your existing ReST API by implementing a database to store your bookshelf data. 

### AddBooksModal functionality
* `queueArray` will work the same as before, updating an array of books defined on the `AddBooksModal` Class that are waiting to be added to the database.  
* When resetting form data, explicitly apply `assets/covers/generic_cover.png` to the `src` attribute for cover. 

### RemoveBooksModal functionality
* Capture the data from the removeBooksModal input fields and use fetch to remove the matching books from your database. (hint: leverage an existing endpoint). 

### Pagination functionality
* Change your current `GET` endpoint to also take in a number of results and page number to bring back data in smaller sets.  (hint: it might also be helpful to find out how many books are in your database and determine a max page number) 
* Using the controls provided implement pagination
```html
<button id="previous" class="btn btn-default">Previous</button>
  <span id="middleNum"></span>
<button id="next" class="btn btn-default">Next</button>
```

### `/deleteBy` author or title
* Change your `/deleteBy` route to use a query string `/deleteBy?title={value}&author={value}` that removes a book from your library database either by title or author.  Upon successful deletion return a **200** status along with number of deleted entries.  This should also fire off the `GET` request and update your table after a successful deletion. Implement logic in the controller method to only remove books based on conditions provided. (hint: [`deleteMany()`](https://mongoosejs.com/docs/api.html#model_Model.deleteMany))

* **Example:** `req.query` will look like this for the following query string: `?title={value}&author={value}`
```js
{
  title: ‘IT’, 
  author: ‘Stephen King’
}
```

* Make sure that pagination is properly implemented; then, modify your current `GET` method endpoint and bake in the search functionality so that it takes in arguments to filter and search on title and/or author.  
