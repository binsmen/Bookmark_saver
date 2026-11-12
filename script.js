const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

//allocating all dom variables to constant's

document.addEventListener("DOMContentLoaded", loadBookmarks);

addBookmarkBtn.addEventListener("click" , function(){
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkUrlInput.value.trim();

    if(!url || !name){
        alert("Please enter both url and name.")
        return;
    }
    else{
        if(!url.startsWith("http://") && !url.startsWith("https://")){
            alert("Please enter an valid URL starting with http:// or https://");
            return ;
        }
    }

    addBookMark(name,url);
    saveBookMark(name,url);
    bookmarkNameInput.value="";
    bookmarkUrlInput.value="";
})

function addBookMark(name,url){
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href=url;
    link.textContent=name;
    link.target="_blank";

    const removeButton = document.createElement("button");
    removeButton.textContent="Remove";
    removeButton.addEventListener("click" , function(){
        bookmarkList.removeChild(li);
        removeBookMarkFromStorage(name,url);
    })

    li.appendChild(link);
    li.appendChild(removeButton);

    bookmarkList.appendChild(li);
}

function getBookMarkFromStorage(){
    const bookmarks = localStorage.getItem("bookmarks");
    return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookMark (name,url){
    const bookmarks = getBookMarkFromStorage();
    bookmarks.push({name,url});
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
}

function loadBookmarks() {
    const bookmarks = getBookMarkFromStorage();
    bookmarks.forEach((bookmark) => addBookMark(bookmark.name,bookmark.url));
}

function removeBookMarkFromStorage(name,url){
    let bookmarks = getBookMarkFromStorage();
    bookmarks = bookmarks.filter((bookmark) => bookmark.name!==name || bookmark.url!==url);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    // loadbookmarks();
}