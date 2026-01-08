import { useState } from "react"
import { transferBook, returnBook, BOOKS_LIMIT } from "../../requests";
import Close from "../../images/icon-close.png"
import Change from "../../images/icon-change.png"

export default function InnerCard({data, dataAll, setDataAll, readerData, countIssuedBooks, hasIssuedBook}) {
    const {book_id, author_name, book_title} = data;
    const {reader_id, full_name} = readerData;

    const [shown, setShown] = useState(false);
    const [newData, setNewData] = useState({
        reader_id: reader_id,
        new_reader_id: null,
        book_id: book_id,
    });

    const handleDeleteInnerCard = async () => {
        if (window.confirm(`Вы уверены, что хотите принять книгу "${book_title}" от читателя ${full_name}?`)) {
            const res = await returnBook(newData);
            if(res){
                window.location.reload();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const res = await transferBook(newData);
    
        if (res === 200) {
            setShown(false);
            window.location.reload();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if(countIssuedBooks(value) >= BOOKS_LIMIT){
            alert(`Количество книг на руках у выбранного читателя превышает лимит ${BOOKS_LIMIT}.`);
            return;
        }

        if(hasIssuedBook(value, book_id)){
            alert(`У выбранного читателя уже есть книга ${book_title}.`);
            return;
        }

        setNewData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChancel = (e) => {
        e.preventDefault();
        setShown(false);
    }

    

    return (
        <div id={book_id} className="inner-card-block">
            <div className="inner-card-block-title">
                <div className="inner-card-block-name">
                    <span>{author_name}</span>
                    <span>«{book_title}»</span> 
                </div>
                {shown?(
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="form-input-block">
                                <label htmlFor="new_reader_id">Новый читатель:</label>
                                <select
                                    name="new_reader_id"
                                    value={newData.new_reader_id || ""}
                                    onChange={(e) => handleChange(e)}
                                    required
                                >
                                    <option value="" disabled>
                                        Выберите читателя
                                    </option>
                                    {dataAll.map((element) => (
                                        <option key={element.reader_id} value={element.reader_id}>
                                            {element.full_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="buttons-block">
                                <button className="grey-button" type="chancel" onClick={(e) => handleChancel(e)}>Отменить</button>
                                <button className="filed-button" type="submit">Перенаправить</button>
                            </div>
                        </form>
                    </>
                ):("")}
            </div>

            <div className="inner-card-block-buttons">
                <img src={Close} alt="Удалить" onClick={() => handleDeleteInnerCard()}/>
                {!shown && (<img src={Change} alt="Перенаправить" onClick={() => setShown(true)}/>)}
            </div>
        </div>
    )
}