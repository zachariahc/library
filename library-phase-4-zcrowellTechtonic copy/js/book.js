/*Constructor for Book class - no methods yet*/

// class Book {
//   constructor(oArgs) {
//     this.cover = oArgs.cover;
//     this.title = oArgs.title; //Required
//     this.author = oArgs.author; //Required
//     this.numberOfPages = parseInt(oArgs.numberOfPages); //Required
//     this.synopsis = oArgs.synopsis;
//     this.publishDate = new Date(String(oArgs.publishDate)).getUTCFullYear(); //Required
//     this.rating = parseInt(oArgs.rating);
//     this._id = oArgs._id;
//     return false;
//   }
// }
 var Book = function (oArgs) {
   // console.log(oArgs);
   this.cover = oArgs.cover;
   this.title = oArgs.title; //Required
   this.author = oArgs.author; //Required
   this.numberOfPages = parseInt(oArgs.numberOfPages); //Required
   this.synopsis = oArgs.synopsis;
   this.publishDate = new Date(String(oArgs.publishDate)).getUTCFullYear(); //Required
   this.rating = parseInt(oArgs.rating);
   this._id = oArgs._id;
   return false;
 };



// add in your editBook method
Book.prototype.editBook = function (editedBook) {
  // for (var key in editedBook) {
  //   if (this.hasOwnProperty(key)) {
  //     this[key] = editedBook[key];
  //   }
  // };
  // this.publishDate = new Date(this.publishDate).getUTCFullYear();
  // return this;
};