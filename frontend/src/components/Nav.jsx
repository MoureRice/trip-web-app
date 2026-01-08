import { addBook, getBooks } from "../requests";
import { useEffect, useState } from "react";

import Book from "./ui/Book";
import AddBook from "./forms/AddBook";
import Arrow from "../images/icon-arrow.png"

export default function Nav() {
    const [shown, setShown] = useState(false);
    const [shown2, setShown2] = useState(false);
    const [booksList, setBooksList] = useState([]);

    useEffect(() => {
        getBooks(setBooksList);
    }, [])

    return (
        <nav className={"nav-block " + (shown2 ? "shown" : "hidden")}>
            <div className="nav-block-switcher">
                <button className="nav-block-switcher-button" onClick={() => setShown2(!shown2)}>
                    <img src={Arrow} alt="Стрелка" className="arrow" /> 
                </button>
            </div>
            <div className="nav-block-inner">
                <div className="nav-block-inner-menu">
                    <h1>Список книг</h1>
                    {! shown &&(                        
                        <button className="filed-button" onClick={() => setShown(true)}>Добавить книгу</button>
                    )}
                </div>
                {shown && (
                    <AddBook setShown={setShown} requestFunction={addBook}/>
                )}
                <div className="nav-block-books-list">
                    {booksList.map((element, index) => {
                        return (
                            <Book key={index} data={element}/>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
} 