let db;

const request = indexedDB.open('budget', 1);

request.onupgradeneeded = function (event){
    const db = event.target.result;

    db.createObjectStore('expenses', {autoIncrement: true})
};

request.onsuccess = function(event){
    db = event.target.result;

    if(navigator.online){
        uploadExpenses();
    }
};

request.onerror = function(event){
    console.log(event.target.errorCode)
};

function saveRecord(transaction){
    const transaction = db.transaction(['new_expense'], 'readwrite');

    const expenseObjectStore = transaction.objectStore('new_expense');

    expenseObjectStore.add(transaction);
}