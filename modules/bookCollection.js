export default class BookList {
  constructor() {
    this.bookCollection = [];
    this.bookCounter = 0;
    this.inputForm = document.querySelector('#addBooks');
    this.displayList = document.querySelector('#bookList');
    this.showListLinkElement = document.getElementById('listBookLink');
    this.addNewBookLinkElement = document.getElementById('addNewBookLink');
    this.contactSectionLinkElement = document.getElementById('contactSectionLink');
    this.welcomeSectionLinkElement = document.getElementById('welcomeMessage');
    this.showListSection = document.querySelector('.listBooksSection');
    this.addNewBookSection = document.querySelector('.addBookformSection');
    this.contactSection = document.querySelector('.contactSection');
    this.welcomeMessageSection = document.querySelector('.welcomeMessage');
    this.alertBookAddMessage = document.querySelector('.alert-message');

    this.inputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const titleValue = document.getElementById('booktitle').value;
      const authorValue = document.getElementById('authorname').value;
      this.addBooks(titleValue, authorValue);
      this.inputForm.reset();
      this.showBooksList(this.bookCollection);
      this.alertBookAddMessage.innerHTML = `
      <p class="alert-message-text"> Book with Title: '${titleValue}' and Author: ${authorValue} has been added </p
      `;
      const thatBindThis = this;
      this.alertBookAddMessage.style.display = 'block';
      setTimeout(() => {
        thatBindThis.alertBookAddMessage.style.display = 'none';
      }, 3000);
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
      document.getElementById('bookList').innerHTML = '<ul class="listbook-container"><li> EMPTY LIST OF BOOKS <li></ul>';
    } else {
      const listBook = arr.map((book, index) => {
        if (index % 2 === 0) {
          return `<li class="book-item-container-light"> '${book.title}' by ${book.author}
                  <button type='button' id='${book.id}' class='remove-button'>Remove</button>
                  </li>`;
        }
        return `<li class="book-item-container-dark"> '${book.title}' by ${book.author}
          <button type='button' id='${book.id}' class='remove-button'>Remove</button>
          </li>`;
      }).join('');
      this.displayList.innerHTML = `<ul class="listbook-container"> ${listBook} <ul>`;
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
    // Initial Functions to run upon starting class
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

    // Event Listeners for Link Clicks
    this.showListLinkElement.addEventListener('click', () => {
      this.addNewBookSection.style.display = 'none';
      this.showListSection.style.display = 'block';
      this.contactSection.style.display = 'none';
      this.welcomeMessageSection.style.display = 'none';
    });

    this.addNewBookLinkElement.addEventListener('click', () => {
      this.addNewBookSection.style.display = 'block';
      this.showListSection.style.display = 'none';
      this.contactSection.style.display = 'none';
      this.welcomeMessageSection.style.display = 'none';
    });

    this.contactSectionLinkElement.addEventListener('click', () => {
      this.addNewBookSection.style.display = 'none';
      this.showListSection.style.display = 'none';
      this.contactSection.style.display = 'block';
      this.welcomeMessageSection.style.display = 'none';
    });
  };
}