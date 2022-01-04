class BookList {
  constructor() {
    this.bookCollection = [];
    this.bookCounter = 0;
    this.inputForm = document.querySelector('#addBooks');
    this.displayList = document.querySelector('#bookList');
    // window.addEventListener('DOMContentLoaded', this.init);
    this.inputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const titleValue = document.getElementById('booktitle').value;
      const authorValue = document.getElementById('authorname').value;
      this.addBooks(titleValue, authorValue);
      this.inputForm.reset();
      this.showBooksList(this.bookCollection);
    });
  }

  addBooks = (titleValue, authorValue) => {
    this.bookCounter += 1;
    this.bookCollection = [...this.bookCollection, {
      id: this.bookCounter, title: titleValue, author: authorValue,
    }];
    localStorage.setItem('awesomeBooksCollection', JSON.stringify(this.bookCollection));
  }

  showBooksList = (arr) => {
    if (arr.length <= 0) {
      document.getElementById('bookList').innerHTML = '<h2> List of Books </h2> <ul><li> EMPTY LIST OF BOOKS <li></ul>';
    } else {
      const listBook = arr.map((book) => `
        <li> '${book.title}' by ${book.author}
        <button type='button' id='${book.id}' class='remove-button'>Remove</button>
        </li>`).join('');
      this.displayList.innerHTML = `<h2> List of Books </h2> <ul> ${listBook} <ul>`;
    }
  }

  removeBooks = (ev) => {
    const buttonId = ev.target.id;
    this.bookCollection = this.bookCollection.filter(
      (y) => y !== this.bookCollection[this.bookCollection.findIndex(
        (x) => x.id === parseInt(buttonId, 10),
      )],
    );
    localStorage.setItem('awesomeBooksCollection', JSON.stringify(this.bookCollection));
    this.showBooksList(this.bookCollection);
  }

  init = () => {
    const dataGet = localStorage.getItem('awesomeBooksCollection');
    const data = JSON.parse(dataGet);
    if (data) {
      this.bookCollection = data;
    }
    this.showBooksList(this.bookCollection);
    this.displayList.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-button')) {
        this.removeBooks(e);
      }
    });
  };
}

const bookListCollection = new BookList();
bookListCollection.init();