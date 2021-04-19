import {Container, Form, Segment, Checkbox} from 'semantic-ui-react'
const EntryForm = ({description, value, isExpense, setDescription, setValue, setIsExpense}) => {
    return (
        <Container>
            <Form.Group>
                <Form.Input 
                    placeholder='New shinny thing' 
                    icon='tags' 
                    width={12} 
                    label='Description' 
                    value={description}
                    onChange={e=>setDescription(e.target.value)}/>
                <Form.Input 
                    width={4} 
                    label='Value' 
                    placeholder='100.00' 
                    icon='euro' 
                    iconPosition="left" 
                    value={value}
                    onChange={e=>setValue(e.target.value)}/>
            </Form.Group>
            <Segment compact>
                <Checkbox 
                    toggle 
                    label='is expense' 
                    checked={isExpense}
                    onChange={()=>setIsExpense(prevState=>!prevState)}/>
            </Segment>
        </Container>
    )
}

export default EntryForm
