import TableHeader from '../widgets/tableHeader';
import TableBooksRow from '../widgets/tableBookRow';
import { useNavigate } from 'react-router-dom';

const TableBooks = ({ books, onEdit, onDelete, columns }) => {
    const navigate = useNavigate();
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {books.map((book, index) => (
                        <TableBooksRow
                            key={index}
                            book={book}
                            onEdit={() => {
                                onEdit(index)
                                navigate(`/books/edit/${index}`)
                            }}
                            onDelete={() => onDelete(index)}
                            onDetail={() => {
                                navigate(`/books/${index}`)
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableBooks;
