// Initialize library array
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Add book to library function
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// DOM Elements
const newBookBtn = document.getElementById('new-book-btn');
const bookDialog = document.getElementById('book-form-dialog');
const bookForm = document.getElementById('book-form');
const cancelBtn = document.getElementById('cancel-btn');

// Event Listeners
newBookBtn.addEventListener('click', () => bookDialog.showModal());
cancelBtn.addEventListener('click', () => bookDialog.close());

bookForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    
    // Add to library
    addBookToLibrary(title, author, pages, read);
    
    // Reset and close form
    bookForm.reset();
    bookDialog.close();
    
    // Temporary console log (we'll display books next)
    console.log("Added book:", myLibrary);
});