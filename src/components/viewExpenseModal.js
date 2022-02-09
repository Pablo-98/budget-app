import { Modal, Button } from 'react-bootstrap'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext'


export default function ViewExpensesModal({budgetId, handleClose }) {
const {getBudgetExpenses, budgets, deleteBudget, deleteExpense } = 
useBudgets()

const budget = UNCATEGORIZED_BUDGET_ID === budgetID 
?  { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
: budgets.find(b => b.id === budgetId)


    return (
     <Modal show ={budgetId != null} onHide={handleClose}>
             <Modal.Header closeButton> 
             <Modal.Title> 
                 <Stack direction="horizontal" gap="2">
                     <div> Expenses - {budget?.name} </div>
                     [budgetId !=== UNCATEGORIZED_BUDGET_ID && (
                         <Button onClick={() => {
                             deleteBudget(budget)
                             handleClose()
                             }} 
                             variant="outline-danger">
                             Delete
                         </Button>
                     )]
                 </Stack>
                 </Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <Form.Group  className="mb-3" controlId="name">
                     <Form.Label> Name</Form.Label>
                     <Form.Control ref={nameRef} type="tex" required />
                 </Form.Group>
                 <Form.Group  className="mb-3" controlId="max">
                     <Form.Label> Maximum Spending</Form.Label>
                     <Form.Control 
                     ref={maxRef} 
                     type="number" 
                     required min={0}
                      step={0.01} 
                      />
                 </Form.Group>
                 <div className="d-flex justify-content-end">
                     <Button variant="primary" type="submit"> Add</Button>
                 </div>
             </Modal.Body>


     </Modal>
    )
}

