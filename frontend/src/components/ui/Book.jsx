import { useState } from "react";
import AddBook from "../forms/AddBook";
import { editBook } from "../../requests";
import Edit from "../../images/icon-edit.png"

export default function Book ({data}) {
    const { book_id, author_name, book_title, total_quantity } = data;

    const [edit, setEdit] = useState(false);

    return (
        <div id={book_id} className="book-block">
            {edit?(
                <AddBook setShown={setEdit} requestFunction={editBook} initialData={data}/>
            ):(
                <>
                    <div className="book-block-title">
                        <span className="book-block-title-author">{author_name}</span>
                        <span className="book-block-title-name">«{book_title}»</span>
                    </div>
                    <span className="book-block-quantity">{total_quantity} шт.</span>
                    <div className="book-block-buttons">
                        <img src={Edit} alt="Редактировать" onClick={() => setEdit(true)}/>
                    </div>
                                            
                </>
            )}
        </div>
    )
}