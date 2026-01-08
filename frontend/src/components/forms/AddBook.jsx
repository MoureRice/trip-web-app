import React, { useState, useEffect } from 'react';
import { getBooks } from '../../requests';

export default function AddBook({setShown, requestFunction, initialData={}}) {
    const { book_id, author_name, book_title, total_quantity } = initialData;
    const [newData, setNewData] = useState({
        author_name: author_name || '',
        book_title: book_title || '',
        total_quantity: total_quantity || '',
    })

    const [booksList, setBooksList] = useState([]);

    useEffect(() => {
        getBooks(setBooksList);
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!book_id){
            const isBookExists = booksList.some(
                (book) =>
                    book.author_name.toLowerCase() === newData.author_name.toLowerCase() &&
                    book.book_title.toLowerCase() === newData.book_title.toLowerCase()
            );
    
            if (isBookExists) {
                alert('Такая книга уже есть в библиотеке.');
                return; 
            }
        }

        const res = await requestFunction(newData, book_id);

        if (res === 200) {
            setShown(false);
            window.location.reload();
        }
    };

    return (
        <div className="form-block">
            <h2>{book_id?`Редактирование данных о книге`:"Добавление книги"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-input-block">
                    <label htmlFor="author_name">Автор</label>
                    <input
                        name="author_name"
                        type="text"
                        value={newData.author_name}
                        placeholder="Л.Н. Толстой"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className="form-input-block">
                    <label htmlFor="book_title">Название</label>
                    <input
                        name="book_title"
                        type="text"
                        value={newData.book_title}
                        placeholder="Война и мир"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className="form-input-block">
                    <label htmlFor="total_quantity">Количество</label>
                    <input
                        name="total_quantity"
                        type="number"
                        placeholder='1'
                        value={newData.total_quantity}
                        min="1"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>

                <div className="buttons-block">
                    <button className="grey-button" type="chancel" onClick={() => setShown(false)}>Отменить</button>
                    <button className="filed-button" type="submit">{book_id?"Сохранить":"Добавить"}</button>
                </div>
            </form>
        </div>
    );
}