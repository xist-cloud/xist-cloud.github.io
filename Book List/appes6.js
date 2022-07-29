class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById("book-list");

        //Create tr element
        const row = document.createElement("tr");

        //Insert Cols
        row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href = '#' class = 'delete'>x</a></td>`;

        list.appendChild(row);
    }

    showAlert(msg, className) {
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
    }

    deleteBook(target) {
        if (target.className === "delete") {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }
}

//Local Storage Class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function (book) {
            const ui = new UI();

            //Add book to UI
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem("books", JSON.stringify(books));
    }
}

//DOM load event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

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

        //Add book to local storage
        Store.addBook(book);

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

    //Remove from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show alert
    ui.showAlert("Book Removed.", "success");
    e.preventDefault();
});
