import { useState } from "react"

import { deleteReader, editReader} from "../../requests";
import InnerCard from "./InnerCard";
import AddReader from "../forms/AddReader";
import IssueBook from "../forms/IssueBook";

export default function Card({data, dataAll, setDataAll, countIssuedBooks, hasIssuedBook}) {
    const { reader_id, full_name, books} = data;
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);

    const readerData = {
        reader_id: reader_id,
        full_name: full_name
    }

    const handleDeleteReader = async (id) => {
        if (window.confirm(`Вы уверены, что хотите удалить читателя "${full_name}"?`)) {
            const res = await deleteReader(id);
            if(res){
                setDataAll(dataAll.filter((element) => element.reader_id !== id));
            }
            alert(res.message);
        }
    };

    return (
        <div id={reader_id} className="card-block">
            {edit?(
                <AddReader setShown={setEdit} requestFunction={editReader} initialData={data}/>
            ):(
                <div className="card-block-title">
                    <h2 className="card-block-title-name" title={full_name}>{full_name}</h2>                        
                </div>
            )}
            <div className="card-block-subitems">
                <h3>{books.length > 0?"Выданные книги":"Пока что нет выданных книг"}</h3>
                {books.length > 0?(
                    <div className="card-block-subitems-list">
                        {books.map((element, index) => {
                            return (
                                <InnerCard key={index} data={element} readerData={readerData} dataAll={dataAll} setDataAll={setDataAll} countIssuedBooks={countIssuedBooks} hasIssuedBook={hasIssuedBook}/>
                            )
                        })}

                    </div>
                ):("")}
                {add && (
                    <IssueBook setShown={setAdd} readerData={readerData} countIssuedBooks={countIssuedBooks} hasIssuedBook={hasIssuedBook}/>
                )}
            </div>
            <div className="buttons-block">
                {!add && (<button className="unfiled-button" onClick={() => setAdd(true)}>Выдать книгу</button>)}
                {!edit && !add && (<button className="grey-button" onClick={() => setEdit(true)}>Изменить</button>)}
                {!add && <button className="delete-button" onClick={() => handleDeleteReader(reader_id)}>Удалить</button>}
            </div>
        </div>
    )
}