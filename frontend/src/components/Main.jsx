import { useEffect, useState } from "react"
import { fetchAllData, addReader} from "../requests";

import Card from "./ui/Card";
import AddReader from "./forms/AddReader";

export default function Main({shown, setShown}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchAllData(setData);
    }, [])

    const countIssuedBooks = (id) => {
        let current = data.filter((element) => {
            return parseInt(element.reader_id) === parseInt(id)
        })

        return current[0].books.length;
    }

    const hasIssuedBook = (reader_id, book_id) => {
        const newReader = data.filter((element) => {
            return parseInt(element.reader_id) === parseInt(reader_id);
        });

        const haveSameBook = newReader[0].books.some((book) => 
            parseInt(book.book_id) === parseInt(book_id)
        )

        return haveSameBook;
    }

    return (
        <main className="main-block">
            {shown && (
                <AddReader setShown={setShown} requestFunction={addReader}/>
            )}

            <div className="main-block-cards-list">
                {data.map((element, index) => {
                    return (
                        <Card key={index} data={element} dataAll={data} setDataAll={setData} countIssuedBooks={countIssuedBooks} hasIssuedBook={hasIssuedBook}/>
                    )
                })}
            </div>
        </main>
    )
}