export default function getBookmarks() {
    // get bookmark articles
    let bookmarks = localStorage.getItem("bookmarks");
    if (bookmarks === null || bookmarks === '') {
        bookmarks = {
            de: [],
            en: [],
            es: []
        };
    } else {
        bookmarks = JSON.parse(bookmarks);
    }

    return bookmarks;
}

export function deleteBookmark(website) {
    let bookmarks = getBookmarks();

    // remove the clicked article from bookmarks local storage
    Object.keys(bookmarks).forEach((key) => {
        switch (key) {
            case 'de':
                for (let bm of bookmarks.de) {
                    if (bm.website === website) {
                        bookmarks.de.splice(bookmarks.de.indexOf(bm), 1)
                    }
                }
                break;
            case 'en':
                for (let bm of bookmarks.en) {
                    if (bm.website === website) {
                        bookmarks.en.splice(bookmarks.en.indexOf(bm), 1)
                    }
                }
                break;
            case 'es':
                for (let bm of bookmarks.es) {
                    if (bm.website === website) {
                        bookmarks.es.splice(bookmarks.es.indexOf(bm), 1)
                    }
                }
                break;
            default:
                break;
            }
    })
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

export function getLocalDate() {
    return new Date().toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}