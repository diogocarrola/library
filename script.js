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

    // Add sample books
    addBookToLibrary("Rich Dad, Poor Dad", "Robert Kiyosaki", 336, true);
    addBookToLibrary("Be Useful", "Arnold Schwarzenegger", 288, false);

    // Display updated books
    displayBooks();
});

// Function to display books in the library
function displayBooks() {
    const container = document.getElementById('books-container');
    container.innerHTML = '';
    
    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.dataset.id = book.id;
        
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>By: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <div class="status">
                <input type="checkbox" id="read-${book.id}" ${book.read ? 'checked' : ''}>
                <label for="read-${book.id}">${book.read ? 'Read' : 'Not Read'}</label>
            </div>
            <div class="card-actions">
                <button class="remove-btn">Remove</button>
            </div>
        `;
        
        // Add checkbox event listener
        const checkbox = card.querySelector(`#read-${book.id}`);
        checkbox.addEventListener('change', () => {
            book.read = checkbox.checked;
            const label = checkbox.nextElementSibling;
            label.textContent = checkbox.checked ? 'Read' : 'Not Read';
        });
        
        container.appendChild(card);
    });
}

// Event listener for removing books
document.getElementById('books-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const bookId = e.target.closest('.book-card').dataset.id;
        const bookIndex = myLibrary.findIndex(book => book.id === bookId);
        
        if (bookIndex !== -1) {
            myLibrary.splice(bookIndex, 1);
            displayBooks();
        }
    }
});