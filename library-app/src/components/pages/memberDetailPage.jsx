import { useParams } from 'react-router-dom';
import MemberDetailCard from '../modules/memberCard';
import DetailLayout from '../templates/detailLayout';

function MemberDetailPage({ members }) {
    const { id } = useParams();
    const detailMember = members.find((member)=>member.id === id);
    return (
        <DetailLayout title={'Member Details'}>
            <MemberDetailCard
            detailMember={detailMember}
        />
        </DetailLayout>
        
    )
}

export default MemberDetailPage;