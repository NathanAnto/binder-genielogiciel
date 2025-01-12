import Book from "../types/book";
import { fetch } from "meteor/fetch";

export async function getBooks(): Promise<Book[]> {
    try {
        const response: Response = await fetch("/api/books", {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        const data = await response.json();
        console.log("Books retrieved successfully:", data);
        return data as Book[]
    } catch (err) {
        console.log("Error retrieving books:", err);
        return [] as Book[];
    }
}

export async function getBookById(book_id: string): Promise<Book> {
    try {
        const response: Response = await fetch(`/api/books/${book_id}`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        const data = await response.json();
        console.log("Books retrieved successfully:", data);
        return data as Book
    } catch (err) {
        console.log("Error retrieving books:", err);
        return {} as Book;
    }
}
