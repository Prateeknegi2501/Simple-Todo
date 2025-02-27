document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense_form");
  const expenseName = document.getElementById("expense_name");
  const expenseAmount = document.getElementById("expense_amount");
  const expenseList = document.getElementById("expense_list");
  const totalAmountDisplay = document.getElementById("total_amount");

  let ExpenseTracker = JSON.parse(localStorage.getItem("expense")) || [];

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputName = expenseName.value.trim();
    let inputAmount = parseFloat(expenseAmount.value.trim());

    if (inputName !== "" && !isNaN(inputAmount) && inputAmount > 0) {
      const newExpense = {
        id: Date.now(),
        expenseName: inputName,
        expenseAmount: inputAmount,
      };

      ExpenseTracker.push(newExpense);
      saveExpense();
      renderExpense();
      updateTotal();

      //Clear Input
      expenseName.value = "";
      expenseAmount.value = "";
    }
  });

  function calculate() {
    return ExpenseTracker.reduce((sum, exp) => sum + exp.expenseAmount, 0);
  }

  function renderExpense() {
    expenseList.innerHTML=""
    ExpenseTracker.forEach((expense) => {
      let item = document.createElement("li");
      item.innerHTML = `
        <span>${expense.expenseName} - $${expense.expenseAmount}</span>
        <button data-Id="${expense.id}">Remove</button>`;
      expenseList.appendChild(item);
    });
  }

  function updateTotal() {
    totalAmount = calculate();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  function saveExpense() {
    localStorage.setItem("expense", JSON.stringify(ExpenseTracker));
  }
  expenseList.addEventListener("click",(e)=>{
    e.stopPropagation();
    if(e.target.tagName==="BUTTON"){
       let ID = parseInt(e.target.getAttribute("data-Id"));
       ExpenseTracker=ExpenseTracker.filter((e)=>e.id!==ID)
       
       saveExpense();
       renderExpense();
       updateTotal();
    }
  })    
  renderExpense();
});
