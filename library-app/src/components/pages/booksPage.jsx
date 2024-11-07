import { useNavigate } from 'react-router-dom';
import TableBooks from '../modules/tableBooks';
import TableLayout from '../templates/TableLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';

function BooksPage({ columns = { columns }, books = { books }, onEdit = { onEdit }, onDelete = { onDelete } }) {
    const navigate = useNavigate();
    const buttonTitle = 'Add Book';
    const onClick = ()=>navigate('/books/add')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);
    
    return (
        <>
        {loading ? <LoadingSpinner/> : <TableLayout title="List of Books" buttonTitle={buttonTitle} onClick={onClick}>
            <TableBooks columns={columns} books={books} onEdit={onEdit} onDelete={onDelete} />
        </TableLayout>  }
        </> 
    )
}

export default BooksPage;