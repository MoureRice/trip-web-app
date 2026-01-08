// ---------- Лимит на выдачу книг ----------

export const BOOKS_LIMIT = 7;

// ---------- Адрес сервера ----------

const URL = "http://localhost:5000";

// ---------- Запрос на получение всех читателей и выданных книг ----------

export const fetchAllData = async (setData) => {
    try {
      const response = await fetch(`${URL}/orders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }

      const data = await response.json();
      
      setData(data);
    } catch (error) {
      console.error('Ошибка при первичной загрузке данных:', error.message);
      alert('Ошибка при первичной загрузке данных: ' + error.message);
    }
};

// ---------- Запрос на добавление читателя ----------

export const addReader = async (data) => {
  try {

    const response = await fetch(`${URL}/orders/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при добавлении читателя');
    }

    alert('Читатель успешно добавлен!');
    return 200;

  } catch (error) {
    console.error('Ошибка:', error.message);
    alert('Ошибка при добавлении читателя: ' + error.message);
  }
};

// ---------- Запрос на удаление читателя по его ID ----------

export const deleteReader = async (id) => {
    try {
        const response = await fetch(`${URL}/orders/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ошибка при удалении читателя');
        }

        const result = await response.json();
        return result; 
    } catch (error) {
        console.error('Ошибка:', error.message);
        alert('Ошибка при удалении читателя: ' + error.message);
    }
};

// ---------- Запрос на редактирование данных читателя ----------

export const editReader = async (data, id) => {
  try {

    const response = await fetch(`${URL}/orders/edit/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при обновлении данных читателя');
    }

    alert('Данные читателя успешно обновлены!');
    return 200;

  } catch (error) {
    console.error('Ошибка:', error.message);
    alert('Ошибка при обновлении данных читателя: ' + error.message);
  }
};

// ---------- Запрос на получение всех книг ----------

export const getBooks = async (setData) => {
  try {
      const response = await fetch(`${URL}/Meds`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error('Ошибка при получении книг');
      }

      const data = await response.json();
      setData(data)
  } catch (error) {
      console.error('Ошибка при загрузке книг:', error.message);
      alert('Ошибка при загрузке книг: ' + error.message);
  }
};

// ---------- Запрос на добавление книги ----------

export const addBook = async (data) => {
  try {

    const response = await fetch(`${URL}/Meds/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при добавлении книги');
    }

    alert('Книга успешно добавлена!');
    return 200;

  } catch (error) {
    console.error('Ошибка:', error.message);
    alert('Ошибка при добавлении книги: ' + error.message);
  }
};

// ---------- Запрос на редактирование книги ----------

export const editBook = async (data, id) => {
  try {

    const response = await fetch(`${URL}/Meds/edit/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при обновлении данных о книге');
    }

    alert('Данные о книге успешно обновлены!');
    return 200;

  } catch (error) {
    console.error('Ошибка:', error.message);
    alert('Ошибка при обновлении данных о книге: ' + error.message);
  }
};

// ---------- Запрос на выдачу книги читателю ----------

export const issueBook = async (data) => {
  try {

    const response = await fetch(`${URL}/issue-book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при выдаче книги читателю');
    }

    alert('Книга успешно выдана читателю!');
    return 200;

  } catch (error) {
    console.error('Ошибка:', error.message);
    alert('Ошибка при выдаче книги читателю: ' + error.message);
  }
};

// ---------- Запрос на возвращение книги в библиотеку ----------

export const returnBook = async (data) => {
  try {

    const response = await fetch(`${URL}/return-book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при возвращении книги в библиотеку');
    }

    alert('Книга успешно возвращена в библиотеку!');
    return 200;

  } catch (error) {
    console.error('Ошибка:', error.message);
    alert('Ошибка при возвращении книги в библиотеку: ' + error.message);
  }
};

// ---------- Запрос на перемещение книги между читателями ----------

export const transferBook = async (data) => {
  try {

    const response = await fetch(`${URL}/transfer-book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при перемещении книги между читателями');
    }

    alert('Книга успешно передана другому читателю!');
    return 200;

  } catch (error) {
    console.error('Ошибка:', error.message);
    alert('Ошибка при перемещении книги между читателями: ' + error.message);
  }
};

