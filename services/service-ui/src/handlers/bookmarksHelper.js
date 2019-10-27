export default function getBookmarks() {
    // get bookmark articles
    let bookmarks = localStorage.getItem("bookmarks");
    if (bookmarks === null || bookmarks === '') {
        bookmarks = [];
    } else {
        bookmarks = JSON.parse(bookmarks);
    }

    return bookmarks;
}

export function deleteBookmark(website) {
    let bookmarks = getBookmarks();

    // remove the clicked article from bookmarks local storage
    for (let bm of bookmarks) {
        if (bm.website === website) {
            bookmarks.splice(bookmarks.indexOf(bm), 1)
        }
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}