import EntryLine from './EntryLine';

const EntryLines = ({entries}) => (
    <div>
        {entries.map(entry => (
        <EntryLine
            key={entry.id}
            {...entry}
            />)
        )}
    </div>
)


export default EntryLines
