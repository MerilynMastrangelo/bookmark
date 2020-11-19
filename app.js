const REQUIRED = 'REQUIRED';

const validate = function (value, flag) {
    if (flag === REQUIRED) {
        return value.trim().length > 0
    }
}

const getBookmarkStorage = function(){
    return JSON.parse(localStorage.getItem('bookmarks'));
}

const setBookmarkStorage = function(bookmarks){
    return localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

const createBookmark = function (siteName, url) {
    if (!validate(siteName, REQUIRED) || !validate(url, REQUIRED)) {
        throw new Error('Please fill all fields')
    }
    return {
        siteName: siteName,
        url: url
    }
}

const getBookmarkInput = function (inputElementId) {
    return document.querySelector(inputElementId);
}

const addBookmark = function (newBookmark) {
    let bookmarks
    // Local Storage Test
    if (localStorage.getItem('bookmarks') === null) {
        // Init array
        bookmarks = [];
        // Add to array
        bookmarks.push(newBookmark);
        // Set to localStorage
        setBookmarkStorage(bookmarks);
    } else {
        // fetch from localStorage
        let bookmarks = getBookmarkStorage();
        // Add bookmarks to array
        bookmarks.push(newBookmark);
        // Reset to localStorage
        setBookmarkStorage(bookmarks);
    }
}


const displayBookmark = function () {
    let bookmark = getBookmarkStorage();

    const result = getBookmarkInput('.result');

    result.innerHTML = ``;

    for (let i = 0; i < bookmark.length; i++) {
        let name = bookmark[i].siteName;
        let url = bookmark[i].url;

        result.innerHTML += `
    
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${name}</span>
            <div class="">
                <a href="${url}" target="_blank">Go to WebSite</a>
                <button type="button" class="btn btn-danger ml-3">Delete</button>
            </div>
        </li>
        
    `;
    getBookmarkInput('.btn-danger').addEventListener('click', deleteBookmark)
    
    }
}

const deleteBookmark = function(e){
    let bookmarks = getBookmarkStorage();
    
    e.target.parentElement.parentElement.remove();

    let url = e.target.previousElementSibling.href;
        
    bookmarks.forEach((bookmark, index) => {
        if(bookmark.url === url){
            bookmarks.splice(index, 1);
        } 
    });

    setBookmarkStorage(bookmarks);
} 

const clearFields = function () {
    getBookmarkInput('form').reset();
    getBookmarkInput('#inputSiteName').focus();
}

const signupHandler = function (e) {
    e.preventDefault();

    let enteredSiteName = getBookmarkInput('#inputSiteName').value;
    let enteredURL = getBookmarkInput('#inputURL').value;

    try {
        const newBookmark = createBookmark(enteredSiteName, enteredURL);

        addBookmark(newBookmark);

        displayBookmark();

        clearFields();

    } catch (err) {
        alert(err.message);
    }
}

const connectForm = function (formId, formSubmitHandler) {
    const form = document.querySelector(formId);
    form.addEventListener('submit', formSubmitHandler)
}
document.addEventListener('DOMContentLoaded', displayBookmark);

connectForm('form', signupHandler);