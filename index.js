let bookCollection = [];
let bookCounter = 0;
const inputForm = document.querySelector('#addBooks');
const displayList = document.querySelector('#bookList');

const showBooksList = (arr) => {
	console.log(bookCollection)
	if (arr.length <= 0) {
		document.getElementById('bookList').innerHTML = '<h2> List of Books </h2> <li> EMPTY LIST OF BOOKS <li>';
	} else {
		const listBook = arr.map((book) => `
			<li> '${book.title}' by ${book.author}
			<button type='button' id='${book.id}' class='remove-button'>Remove</button>
			</li>`).join('');
		displayList.innerHTML = `<h2> List of Books </h2> ${listBook}`;
	}
	displayList.addEventListener('click', (e) => {
		if (e.target.classList.contains('remove-button')) {
			removeBooks(e);
		}
	});
}

const addBooks = (titleValue, authorValue) => {
	bookCounter += 1;
	bookCollection = [...bookCollection,{id: bookCounter ,title:titleValue, author:authorValue}];
}

const removeBooks = (ev) => {
	const buttonId = ev.target.id;
	bookCollection = bookCollection.filter(
		(y) => y !== bookCollection[bookCollection.findIndex(
			(x) => x.id === parseInt(buttonId, 10),
		)],
	);
	showBooksList(bookCollection);
}

inputForm.addEventListener('submit', event => {
  event.preventDefault();
	const titleValue = document.getElementById("booktitle").value;
	const authorValue = document.getElementById("authorname").value;
	addBooks(titleValue, authorValue);
	inputForm.reset();	
	showBooksList(bookCollection);
});

