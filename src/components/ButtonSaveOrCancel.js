import {Button} from 'semantic-ui-react'

const ButtonSaveOrCancel = ({addEntry}) => (
  <Button.Group style={{marginTop:20}}>
    <Button>Cancel</Button>
    <Button.Or />
    <Button primary onClick={()=>addEntry()}>Ok</Button>
  </Button.Group>
)

export default ButtonSaveOrCancel
