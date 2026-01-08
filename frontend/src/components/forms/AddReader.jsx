import React, { useState } from 'react';

export default function AddReader({setShown, requestFunction, dataAll, initialData={}}) {
    const { reader_id, full_name } = initialData;
    const [newData, setNewData] = useState({
        full_name: full_name || '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await requestFunction(newData, reader_id);
        if (res === 200) {
            setShown(false);
            window.location.reload();
        }
    };

    return (
        <div className="form-block">
            <h2>{reader_id?`Редактирование данных о читателе`:"Добавление читателя"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-input-block">
                    <label htmlFor="full_name">ФИО</label>
                    <input
                        name="full_name"
                        type="text"
                        value={newData.full_name}
                        placeholder="Л.Н. Толстой"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>

                <div className="buttons-block">
                    <button className="grey-button" type="chancel" onClick={() => setShown(false)}>Отменить</button>
                    <button className="filed-button" type="submit">{reader_id?"Сохранить":"Добавить"}</button>
                </div>
            </form>
        </div>
    );
}