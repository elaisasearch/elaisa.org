export default function getBookmarks(){
    // get bookmark articles
    let bookmarks = localStorage.getItem("bookmarks");
    if (bookmarks === null || bookmarks === '') {
        bookmarks = [];
    } else {
        bookmarks = JSON.parse(bookmarks);
    }

    return bookmarks;
}