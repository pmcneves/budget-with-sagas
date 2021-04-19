import EntryLine from './EntryLine';

const EntryLines = ({entries, deleteEntry, editEntry}) => (
    <div>
        {entries.map(entry => (
        <EntryLine
            key={entry.id}
            {...entry}
            deleteEntry={deleteEntry}
            editEntry={editEntry}/>)
        )}
    </div>
)


export default EntryLines
