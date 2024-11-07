import { useNavigate } from 'react-router-dom';
import TableMembers from '../modules/tableMembers';
import TableLayout from '../templates/TableLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';

function MembersPage({ columns = { columns }, members = { members }, onEdit = { onEdit }, onDelete = { onDelete } }) {
    const navigate = useNavigate();
    const buttonTitle = 'Add Member';
    const onClick = ()=>navigate('/members/add')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);
    return (
        <>
        {loading ? <LoadingSpinner/> : <TableLayout title="List of Members" buttonTitle={buttonTitle} onClick={onClick} >
            <TableMembers columns={columns} members={members} onEdit={onEdit} onDelete={onDelete} />
        </TableLayout> }
        </>
    )
}

export default MembersPage;