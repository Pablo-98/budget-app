import { useEffect, useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './AddExpenseModal';
import ViewExpensesModal from './components/viewExpenseModal';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/UncategorizedBudgetCard'
import BudgetCard from './components/BudgetCard';
import { useBudgets } from './components/contexts/BudgetsContext'
import { UNCATEGORIZED_BUDGET_ID } from './components/contexts/BudgetsContext';
import '../src/App.css'

 function App() {
  // setting up light/dark mode for app 8-24-22
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

   const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
   const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
   const [ViewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
   const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(false)
   const { budgets, getBudgetExpenses} = useBudgets()

   function openAddExpenseModal(budgetId) {
     setShowAddExpenseModal(true)
     setAddExpenseModalBudgetId(budgetId)
    }

  return ( 
    <>
  <Container className="my-4" >
    <Stack direction="horizontal" gap="2" className="mb-4">
      <h1 id="budget-title" className="me-auto">Budgets</h1>
      
      <div className={`App ${theme}`}>
        <button onClick={toggleTheme}> Toggle Theme</button>
        
      </div>

      <Button  variaint="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
      <Button variaint="outline-primary" onClick={openAddExpenseModal} >Add Expense</Button>
      </Stack>
      <div 
      style= {{
         display:"grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
         alignItems: "flex-start",
        }}
        >
          {budgets.map(budget => {
            const amount = getBudgetExpenses (budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
              )
            
            return (
            <BudgetCard        
            key={budget.id}
           name={budget.name}
           amount={amount}
            max={budget.max}
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}

            /> 
          )
          })}
          <UncategorizedBudgetCard
           onAddExpenseClick={openAddExpenseModal}
          onViewExpenseClick={() => 
          setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />

            </div>
      </Container>
      <AddBudgetModal  show={showAddBudgetModal}
       handleClose={() => setShowAddBudgetModal(false)} 
       />
        <AddExpenseModal
         show={showAddExpenseModal}
         defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)} 
       />
        <ViewExpensesModal
         budgetId={ViewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()} 
       />
       <div id="image" > </div>
      </>

  )
}

export default App;
