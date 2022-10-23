class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

let myLibrary = [];

function addNewBooks(newTitle, newAuthor, newPages, isReadBool) {
    let newBook = new Book(newTitle, newAuthor, newPages, isReadBool);
    myLibrary.push(newBook);
    createBookCard(newBook);
}

let btn = document.querySelector('.add');
let bookContainer = document.querySelector('.book-container');
let container = document.querySelector('.content-container');
let modal = document.querySelector('.modal');
let bookSubmit = document.querySelector('.add-book-button');
let overlay = document.querySelector('.overlay');
let error = document.querySelector('.error');

btn.addEventListener('click', modalPopup);

function modalPopup() {
    modal.style.display = 'flex';
    overlay.style.display = 'block';
    container.classList.add('blur');
}

bookSubmit.addEventListener('click', (e) => {
    let flag = 0;
    let newTitle = document.querySelector('#title').value;
    let newAuthor = document.querySelector('#author').value;
    let newPages = document.querySelector('#pages').value;
    let isRead = document.querySelector('#isRead').checked;
    if (newTitle != '') {
        myLibrary.forEach(function (book) {
            if (newTitle === book.title &&
                newAuthor === book.author &&
                newPages === book.pages ||
                newTitle === book.title &&
                newAuthor === book.author) {
                flag = 1;
            }
        });
    }

    if (flag === 0) {
        error.textContent = "";
        e.preventDefault();
        document.getElementById('modal-form').reset();
        overlay.style.display = 'none';
        modal.style.display = 'none';
        container.classList.remove('blur');

        addNewBooks(newTitle, newAuthor, newPages, isRead);
    } else {
        e.preventDefault();
        error.textContent = "Already added.";
    }
});

window.onclick = function (event) {
    if (event.target == overlay) {
        overlay.style.display = 'none';
        modal.style.display = 'none';
        container.classList.remove('blur');
    }
}

function createBookCard(book) {
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookContainer.appendChild(bookCard);

    let titleText = document.createElement('h3');
    titleText.textContent = `${book.title}`;
    bookCard.appendChild(titleText);

    let authorName = document.createElement('p');
    authorName.textContent = `by ${book.author}`;
    bookCard.appendChild(authorName);

    let pagesRead = document.createElement('p');
    pagesRead.textContent = `${book.pages} pages`;
    bookCard.appendChild(pagesRead);

    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    let isReadOrNot = document.createElement('button');
    if (book.read === true) {
        isReadOrNot.textContent = 'Read';
    } else {
        isReadOrNot.textContent = 'Not Read';
    }
    buttonContainer.appendChild(isReadOrNot);

    isReadOrNot.addEventListener('click', () => {
        if (book.read === true) {
            book.read = false;
            isReadOrNot.textContent = 'Not Read';
        } else {
            book.read = true;
            isReadOrNot.textContent = 'Read';
        }

    });

    let remove = document.createElement('button');
    remove.textContent = 'Remove';
    buttonContainer.appendChild(remove);
    
    remove.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(book), 1);
        bookContainer.removeChild(bookCard);
    });

    bookCard.appendChild(buttonContainer);
}