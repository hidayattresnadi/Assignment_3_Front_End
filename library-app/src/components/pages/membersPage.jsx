import { useNavigate } from 'react-router-dom';
import TableMembers from '../modules/tableMembers';
import TableLayout from '../templates/TableLayout';

function MembersPage({ columns = { columns }, members = { members }, onEdit = { onEdit }, onDelete = { onDelete } }) {
    const navigate = useNavigate();
    const buttonTitle = 'Add Member';
    const onClick = ()=>navigate('/members/add')
    return (
        <TableLayout title="List of Members" buttonTitle={buttonTitle} onClick={onClick} >
            <TableMembers columns={columns} members={members} onEdit={onEdit} onDelete={onDelete} />
        </TableLayout>
    )
}

export default MembersPage;