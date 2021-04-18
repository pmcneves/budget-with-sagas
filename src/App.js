import {Container, Statistic} from 'semantic-ui-react'
import MainHeader from './components/MainHeader';
import DisplayBalances from './components/DisplayBalances';
import DisplayBalance from './components/DisplayBalance';
import EntryLine from './components/EntryLine';


import './App.css';
import NewEntryForm from './components/NewEntryForm';

function App() {
  return (
    <Container>

      <MainHeader title='Budget'/>
      <Statistic size="small">
        <DisplayBalance title='Your Balance' value='2,550.52' color="black" size="small"/>
      </Statistic>
      <DisplayBalances/>

      <MainHeader title='History' type="h3"/>
      <EntryLine description='Income' value='10.00'/>
      <EntryLine description='Expense' value='10.00' isExpense/>

      <MainHeader title='Add new transaction' type="h3"/>
      <NewEntryForm />
    </Container>
  );
}

export default App;
