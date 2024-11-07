import TableHeader from '../widgets/tableHeader';
import TableMemberRow from '../widgets/tableMemberRow';
import { useNavigate } from 'react-router-dom';


const TableMembers = ({ members, onEdit, onDelete, columns }) => {
    const navigate = useNavigate();
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {members.map((member) => (
                        <TableMemberRow
                            key={member.id}
                            member={member}
                            onEdit={() => {
                                onEdit(member.id)
                                navigate(`/members/edit/${member.id}`)
                            }}
                            onDelete={() => onDelete(member.id)}
                            onDetail={() => {
                                navigate(`/members/${member.id}`)
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableMembers;
