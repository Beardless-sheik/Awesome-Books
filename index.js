let bookCollection = [];
let bookCounter = 0;
const inputForm = document.querySelector('#addBooks');
const displayList = document.querySelector('#bookList');

const addBooks = (titleValue, authorValue) => {
  bookCounter += 1;
  bookCollection = [...bookCollection, { id: bookCounter, title: titleValue, author: authorValue }];
  localStorage.setItem('awesomeBooksCollection', JSON.stringify(bookCollection));
};

const showBooksList = (arr) => {
  if (arr.length <= 0) {
    document.getElementById('bookList').innerHTML = '<h2> List of Books </h2> <ul><li> EMPTY LIST OF BOOKS <li></ul>';
  } else {
    const listBook = arr.map((book) => `
      <li> '${book.title}' by ${book.author}
      <button type='button' id='${book.id}' class='remove-button'>Remove</button>
      </li>`).join('');
    displayList.innerHTML = `<h2> List of Books </h2> <ul> ${listBook} <ul>`;
  }
};

const removeBooks = (ev) => {
  const buttonId = ev.target.id;
  bookCollection = bookCollection.filter(
    (y) => y !== bookCollection[bookCollection.findIndex(
      (x) => x.id === parseInt(buttonId, 10),
    )],
  );
  localStorage.setItem('awesomeBooksCollection', JSON.stringify(bookCollection));
  showBooksList(bookCollection);
};

const init = () => {
  const dataGet = localStorage.getItem('awesomeBooksCollection');
  const data = JSON.parse(dataGet);
  if (data) {
    bookCollection = data;
  }
  showBooksList(bookCollection);
  displayList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-button')) {
      removeBooks(e);
    }
  });
};

// Event Listeners
window.addEventListener('DOMContentLoaded', init);
inputForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleValue = document.getElementById('booktitle').value;
  const authorValue = document.getElementById('authorname').value;
  addBooks(titleValue, authorValue);
  inputForm.reset();
  showBooksList(bookCollection);
});
