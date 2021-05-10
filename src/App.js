import {Container, Statistic} from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import MainHeader from './components/MainHeader';
import DisplayBalances from './components/DisplayBalances';
import DisplayBalance from './components/DisplayBalance';
import EntryLines from './components/EntryLines';
import NewEntryForm from './components/NewEntryForm';
import ModalEdit from './components/ModalEdit';
import {useSelector, useDispatch} from 'react-redux';
import { getAllEntries } from './actions/entries.actions';

function App() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [entry, setEntry] = useState();
  const entries = useSelector(state => state.entries);
  const {isOpen, id} = useSelector(state => state.modals);
  const dispatch = useDispatch();

  useEffect(() => {
    const index = entries.findIndex(entry => entry.id === id);
    setEntry(entries[index]);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, id, entries]);

  useEffect(() => {
    let totalIncomes = 0;
    let totalExpenses = 0;
    entries.map(entry=> {
      if (entry.isExpense) {
        return totalExpenses += Number(entry.value)
      } else {
        return totalIncomes += Number(entry.value)
      }
    })
    setTotal(totalIncomes - totalExpenses);
    setExpenseTotal(totalExpenses);
    setIncomeTotal(totalIncomes);
  }, [entries]);




  useEffect(() => {
    dispatch(getAllEntries());
  }, [dispatch])

  return (
    <Container>
      <MainHeader title='Budget'/>
      <Statistic size="small">
        <DisplayBalance title='Your Balance' value={total} color="black" size="small"/>
      </Statistic>
      <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal}/>

      <MainHeader title='History' type="h3"/>
      <EntryLines entries={entries}/>

      <MainHeader title='Add new transaction' type="h3"/>
      <NewEntryForm/>

      <ModalEdit isOpen={isOpen} {...entry}/>
    </Container>
  );
}

export default App;


