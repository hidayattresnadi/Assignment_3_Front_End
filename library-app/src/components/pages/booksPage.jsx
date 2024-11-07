import { useNavigate } from 'react-router-dom';
import TableBooks from '../modules/tableBooks';
import TableLayout from '../templates/TableLayout';

function BooksPage({ columns = { columns }, books = { books }, onEdit = { onEdit }, onDelete = { onDelete } }) {
    const navigate = useNavigate();
    const buttonTitle = 'Add Book';
    const onClick = ()=>navigate('/books/add')
    return (
        <TableLayout title="List of Books" buttonTitle={buttonTitle} onClick={onClick}>
            <TableBooks columns={columns} books={books} onEdit={onEdit} onDelete={onDelete} />
        </TableLayout>
    )
}

export default BooksPage;