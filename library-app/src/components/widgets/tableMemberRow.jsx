import TableCell from '../elements/tableCell';
import Button from '../elements/button';
import Icon from '../elements/icon';

const TableMemberRow = ({ member, onEdit, onDelete, onDetail }) => (
    <tr>
        <TableCell>{member.id}</TableCell>
        <TableCell>{member.fullName}</TableCell>
        <TableCell>{member.email}</TableCell>
        <TableCell>{member.gender}</TableCell>
        <TableCell>{member.phone}</TableCell>
        <TableCell>{member.address}</TableCell>
        <TableCell>
            <Button onClick={onEdit} className="btn btn-primary" ariaLabel="Edit Book">
                <Icon className="fas fa-pencil-alt" />
            </Button>
        </TableCell>
        <TableCell>
            <Button onClick={onDelete} className="btn btn-danger" ariaLabel="Delete Book">
                <Icon className="fas fa-trash-alt" />
            </Button>
        </TableCell>
        <TableCell>
            <Button onClick={onDetail} className="btn btn-primary" aria-label="Detail Book">
                <Icon className="fas fa-eye" />
            </Button>
        </TableCell>
    </tr>
);

export default TableMemberRow;