import {Container, Statistic} from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import MainHeader from './components/MainHeader';
import DisplayBalances from './components/DisplayBalances';
import DisplayBalance from './components/DisplayBalance';
import EntryLines from './components/EntryLines';
import NewEntryForm from './components/NewEntryForm';
import ModalEdit from './components/ModalEdit'


function App() {
  const [entries, setEntries] = useState(initialEntries);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [isExpense, setIsExpense] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [entryId, setEntryId] = useState();
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if(!isOpen && entryId){
      const index = entries.findIndex(entry=> entry.id === entryId);
      const newEntries = [...entries];
      newEntries[index].description = description;
      newEntries[index].value = value;
      newEntries[index].isExpense = isExpense;
      setEntries(newEntries);
      resetEntry();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    let totalIncomes = 0;
    let totalExpenses = 0;
    entries.map(entry=> {
      if (entry.isExpense) {
        totalExpenses += Number(entry.value)
      } else {
        totalIncomes += Number(entry.value)
      }
    })
    setTotal(totalIncomes - totalExpenses);
    setExpenseTotal(totalExpenses);
    setIncomeTotal(totalIncomes);
  }, [entries])

  function deleteEntry(id) {
    const result = entries.filter(entry => entry.id !== id)
    console.log(`entries`, entries);
    console.log('result', result);
    setEntries(result);
  }

  function addEntry() {
    const result = entries.concat({
      id:entries.length +1, 
      description, 
      value,
      isExpense});
    setEntries(result);
    resetEntry();
  }

  function editEntry(id) {
    console.log(`edit entry with id ${id}`);
    if(id) {
      const index = entries.findIndex(entry => entry.id === id);
      const entry = entries[index];
      setEntryId(id);
      setDescription(entry.description);
      setValue(entry.value);
      setIsExpense(entry.isExpense);
      setIsOpen(true);
    }
  }

  function resetEntry() {
    setDescription('');
    setValue('');
    setIsExpense(true);
  }

  return (
    <Container>

      <MainHeader title='Budget'/>
      <Statistic size="small">
        <DisplayBalance title='Your Balance' value={total} color="black" size="small"/>
      </Statistic>
      <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal}/>

      <MainHeader title='History' type="h3"/>
      <EntryLines entries={entries} deleteEntry={deleteEntry} editEntry={editEntry}/>

      <MainHeader title='Add new transaction' type="h3"/>
      <NewEntryForm 
        addEntry={addEntry}
        description={description}
        value={value}
        isExpense={isExpense}
        setDescription={setDescription}
        setValue={setValue}
        setIsExpense={setIsExpense}/>

      <ModalEdit 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        addEntry={addEntry}
        description={description}
        value={value}
        isExpense={isExpense}
        setDescription={setDescription}
        setValue={setValue}
        setIsExpense={setIsExpense} />
    </Container>
  );
}

export default App;


const initialEntries = [
  {
    id:1,
    description:"Work",
    value: 1000.00,
    isExpense: false
  },
  {
    id:2,
    description: "Water bill",
    value: 20.00,
    isExpense: true
  },
  {
    id:3,
    description: "Rent",
    value: 300,
    isExpense: true
  },
  {
    id:4,
    description: "Power bill",
    value: 50,
    isExpense: true
  }
]

