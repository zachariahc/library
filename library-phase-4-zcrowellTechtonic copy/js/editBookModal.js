// if you go onto the bonus edit functionality you can use this file to organize everyhing
class EditBookModal extends Library {
    constructor() {
        super();
        // this.$container = $("#books-table");
    }

    init() {
        this._bindEvents();
    };



    _bindEvents() {
        $("#edit-book-button").on("click", $.proxy(this.editBooks, this));

    }


    editBooks(e) {

    }

}
$(() => {
    window.gEditBookModal = new EditBookModal();
    gEditBookModal.init();
});