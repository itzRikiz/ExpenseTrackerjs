document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseName = document.getElementById('expenseName');
    const expenseAmount = document.getElementById('expenseAmount');
    const expenseDescription = document.getElementById('expenseDescription');
    const expenseCategory = document.getElementById('expenseCategory');

    const expenseTableBody = document.getElementById('expenseTableBody');
    
    // create empty storage initially

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
    // function to create Table
    const renderExpenses = () => {
        expenseTableBody.innerHTML = '';
        expenses.forEach((expense, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${expense.name}</td>
                <td>${expense.amount}</td>
                <td>${expense.description}</td>
                <td>${expense.category}</td>
                <td>
                    <button class="btn btn-sm btn-warning edit-expense" data-index="${index}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-expense" data-index="${index}">Delete</button>
                </td>
            `;
            expenseTableBody.appendChild(tr);
        });
    };
    
    const saveExpenses = () => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };
    
    const addExpense = (name, amount, description, category) => {
        expenses.push({ name, amount, description, category });
        saveExpenses();
        renderExpenses();
    };
    
    const editExpense = (index, name, amount, description, category) => {
        expenses[index] = { name, amount, description, category };
        saveExpenses();
        renderExpenses();
    };
    
    const deleteExpense = (index) => {
        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
    };
    
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addExpense(expenseName.value, expenseAmount.value, expenseDescription.value, expenseCategory.value);
        expenseName.value = '';
        expenseAmount.value = '';
        expenseDescription.value = '';
        expenseCategory.value = '';
    });
    
    expenseTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-expense')) {
            const index = e.target.getAttribute('data-index');
            const expense = expenses[index];
            expenseName.value = expense.name;
            expenseAmount.value = expense.amount;
            expenseDescription.value = expense.description;
            expenseCategory.value = expense.category;
            deleteExpense(index);
        }
        
        if (e.target.classList.contains('delete-expense')) {
            const index = e.target.getAttribute('data-index');
            deleteExpense(index);
        }
    });
    
    renderExpenses();
});
