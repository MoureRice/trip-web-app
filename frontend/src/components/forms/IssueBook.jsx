import { useEffect, useState } from "react";
import { getBooks, issueBook, BOOKS_LIMIT} from "../../requests";

export default function IssueBook({ setShown, readerData, countIssuedBooks, hasIssuedBook }) {
    const { reader_id, full_name} = readerData;

    const [newData, setNewData] = useState({
        reader_id: reader_id,
        book_id: "",
    })
    const [booksList, setBooksList] = useState([]);

    useEffect(() => {
        getBooks(setBooksList);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if(countIssuedBooks(reader_id) >= BOOKS_LIMIT){
            alert(`Количество книг на руках ${full_name} превышает лимит ${BOOKS_LIMIT}.`);
            return;
        }

        if(hasIssuedBook(reader_id, value)){
            alert(`У ${full_name} уже есть такая книга.`);
            return;
        }

        setNewData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await issueBook(newData);
        if (res === 200) {
            setShown(false);
            window.location.reload();
        }
    };

    return (
        <div className="form-block">
            <h3>Выдача книги</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-select-block">
                    <label htmlFor="book_id">Книга</label>
                    <select
                        name='book_id'
                        value={newData.book_id}
                        onChange={(e) => handleChange(e)}
                        required
                    >
                        <option value="" disabled>
                            Выберите книгу
                        </option>
                        {booksList.map((element) => (
                            <option key={element.book_id} value={element.book_id}>
                                {element.author_name} - {element.book_title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="buttons-block">
                    <button className="grey-button" type="button" onClick={() => setShown(false)}>Отменить</button>
                    <button className="filed-button" type="submit">Выдать</button>
                </div>
            </form>
        </div>
    );
}