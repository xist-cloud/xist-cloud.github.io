//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor
function UI() {}

//Add book to UI
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById("book-list");

    //Create tr element
    const row = document.createElement("tr");

    //Insert Cols
    row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href = '#' class = 'delete'>x</a></td>`;

    list.appendChild(row);
};

//Validate method
UI.prototype.showAlert = function (msg, className) {
    //Div
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(msg));
    //get parent
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    //Insert Alert
    container.insertBefore(div, form);

    //Timeout after 3 seconds
    setTimeout(function () {
        document.querySelector(".alert").remove();
    }, 3000);
};

//Delete book
UI.prototype.deleteBook = function (target) {
    if (target.className === "delete") {
        target.parentElement.parentElement.remove();
    }
};

//Clear fields
UI.prototype.clearFields = function () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
};

//Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
    //Get form values
    const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value;

    //Instantiate a book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //Validate
    if (title === "" || author === "" || isbn === "") {
        // Error Alert
        ui.showAlert("Please fill in all fields.", "error");
    } else {
        //Add Book to list
        ui.addBookToList(book);

        //Show success
        ui.showAlert("Book Added", "success");

        //Clear fields
        ui.clearFields();
    }
    e.preventDefault();
});

//Event Listener for Delete
document.getElementById("book-list").addEventListener("click", function (e) {
    const ui = new UI();

    //Delete Book
    ui.deleteBook(e.target);

    //Show alert
    ui.showAlert("Book Removed.", "success");
    e.preventDefault();
});
