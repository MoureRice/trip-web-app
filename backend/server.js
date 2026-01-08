const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Создаем приложение Express
const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json()); 

// Подключение к базе данных
const db = mysql.createConnection({
    host: 'localhost',       // Хост базы данных
    user: 'root',            // Имя пользователя базы данных
    password: '4444',    // Пароль пользователя базы данных
    database: 'Pharmacy' // Название базы данных
});

db.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
        return;
    }
    console.log('Подключение к базе данных успешно!');
});

// Маршрут для проверки работы сервера
app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

// ---------- Получение всех читателей и выданных книг ----------

app.get('/orders', (req, res) => {
    const sql = `
        SELECT 
            r.order_id,
            r.full_name,
            b.meds_id,
            b.meds_name
        FROM Orders r
        LEFT JOIN Issued_Meds ib ON r.order_id = ib.order_id
        LEFT JOIN Meds b ON ib.meds_id = b.meds_id
        ORDER BY r.order_id, b.meds_id;
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Ошибка при выполнении запроса:', err);
            return res.status(500).json({ error: 'Ошибка при получении данных', details: err });
        }

        const Orders = {};

        results.forEach(row => {
            const { order_id, full_name, meds_id, meds_name} = row;

            if (!Orders[order_id]) {
                Orders[order_id] = {
                    order_id,
                    full_name,
                    Meds: []
                };
            }

            if (meds_id) {
                Orders[order_id].Meds.push({
                    meds_id,
                    meds_name
                });
            }
        });

        const response = Object.values(Orders);

        res.json(response);
    });
});

// ---------- Добавление читателя ----------

app.post('/Orders/add', (req, res) => {
    const { full_name } = req.body;

    const sql = `
        INSERT INTO Orders (full_name)
        VALUES (?);
    `;

    db.query(sql, [full_name], (err, result) => {
        if (err) {
            console.error('Ошибка при добавлении читателя:', err);
            return res.status(500).json({ error: 'Ошибка при добавлении читателя', details: err });
        }

        res.status(201).json({
            message: 'Читатель успешно добавлен.',
            order_id: result.insertId
        });
    });
});

// ---------- Удаление читателя ----------

app.delete('/Orders/delete/:order_id', (req, res) => {
    const { order_id } = req.params;

    const sql = `
        DELETE FROM Orders
        WHERE order_id = ?;
    `;

    db.query(sql, [order_id], (err, result) => {
        if (err) {
            console.error('Ошибка при удалении читателя:', err);
            return res.status(500).json({ error: 'Ошибка при удалении читателя', details: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Читатель с указанным ID не найден.' });
        }

        res.json({
            message: 'Читатель успешно удалён.',
            order_id: order_id
        });
    });
});

// ---------- Редактирование данных читателя ----------

app.put('/Orders/edit/:order_id', (req, res) => {
    const { order_id } = req.params;
    const { full_name } = req.body;

    if (!full_name) {
        return res.status(400).json({ error: 'Полное имя читателя обязательно для обновления.' });
    }

    const sql = `
        UPDATE Orders
        SET full_name = ?
        WHERE order_id = ?;
    `;

    db.query(sql, [full_name, order_id], (err, result) => {
        if (err) {
            console.error('Ошибка при обновлении читателя:', err);
            return res.status(500).json({ error: 'Ошибка при обновлении читателя', details: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Читатель с указанным ID не найден.' });
        }

        res.json({
            message: 'Читатель успешно обновлён.',
            order_id: order_id,
            updated_full_name: full_name
        });
    });
});

// ---------- Получение списка всех книг ----------

app.get('/Meds', (req, res) => {
    const sql = `SELECT * FROM Meds;`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Ошибка при выполнении запроса:', err);
            return res.status(500).json({ error: 'Ошибка при получении данных', details: err });
        }

        res.json(results);
    });
});

// ---------- Добавление книги ----------

app.post('/Meds/add', (req, res) => {
    const { meds_name, total_quantity } = req.body;

    const sql = `
        INSERT INTO Meds (meds_name, total_quantity)
        VALUES (?, ?, ?);
    `;

    db.query(sql, [meds_name, parseInt(total_quantity)], (err, result) => {
        if (err) {
            console.error('Ошибка при добавлении книги:', err);
            return res.status(500).json({ error: 'Ошибка при добавлении книги', details: err });
        }

        res.status(201).json({ message: 'Книга успешно добавлена', meds_id: result.insertId });
    });
});

// ---------- Редактирование данных о книге ----------

app.put('/Meds/edit/:meds_id', (req, res) => {
    const { meds_id } = req.params;
    const { meds_name, total_quantity } = req.body;

    const sql = `
        UPDATE Meds
        SET meds_name = ?, total_quantity = ?
        WHERE meds_id = ?;
    `;

    db.query(sql, [meds_name, parseInt(total_quantity), meds_id], (err, result) => {
        if (err) {
            console.error('Ошибка при обновлении книги:', err);
            return res.status(500).json({ error: 'Ошибка при обновлении книги', details: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Книга с указанным ID не найдена.' });
        }

        res.status(200).json({ message: 'Книга успешно обновлена.' });
    });
});

// ---------- Выдача книги читателю ----------

app.post('/issue-book', (req, res) => {
    const { order_id, meds_id } = req.body;

    db.query('SELECT total_quantity FROM Meds WHERE meds_id = ?', [meds_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка при запросе данных о книге' });
        }

        const totalQuantity = results[0]?.total_quantity;

        if (!totalQuantity || totalQuantity <= 0) {
            return res.status(400).json({ error: 'Книга недоступна для выдачи' });
        }

        db.query('UPDATE Meds SET total_quantity = total_quantity - 1 WHERE meds_id = ?', [meds_id], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Ошибка при обновлении количества экземпляров книги' });
            }

            db.query('INSERT INTO Issued_Meds (order_id, meds_id) VALUES (?, ?)', [order_id, meds_id], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Ошибка при записи в таблицу выдачи' });
                }

                return res.status(200).json({ message: 'Книга успешно выдана' });
            });
        });
    });
});

// ---------- Возвращение книги в библиотеку ----------

app.post('/return-book', (req, res) => {
    const { order_id, meds_id } = req.body;

    db.query('DELETE FROM Issued_Meds WHERE order_id = ? AND meds_id = ?', [order_id, meds_id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка при удалении записи о выдаче' });
        }

        db.query('UPDATE Meds SET total_quantity = total_quantity + 1 WHERE meds_id = ?', [meds_id], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Ошибка при обновлении количества экземпляров книги' });
            }

            return res.status(200).json({ message: 'Книга успешно возвращена в библиотеку' });
        });
    });
});

// ---------- Передача книги от одного читателя к другому ----------

app.post('/transfer-book', (req, res) => {
    const { order_id, new_order_id, meds_id } = req.body;

    db.query(
        'UPDATE Issued_Meds SET order_id = ? WHERE order_id = ? AND meds_id = ?',
        [new_order_id, order_id, meds_id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Ошибка при изменении записи о выдаче книги' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Не найдена запись о выдаче книги для данного читателя' });
            }

            return res.status(200).json({ message: 'Книга успешно переведена на нового читателя' });
        }
    );
});


// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});