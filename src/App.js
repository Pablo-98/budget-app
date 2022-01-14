import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'

 function App() {
  return  <Container>
    <Stack direction="horizontal" gap="2" className="mb-4">
      <h1 className="me-auto">Budgets</h1>
      <Button variaint="primary">Add Budget</Button>
      <Button variaint="outline-primary">Add Expense</Button>

    </Stack>

  </Container>
}

export default App;
