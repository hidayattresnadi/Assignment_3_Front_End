import { useParams } from 'react-router-dom';
import BookDetailCard from '../modules/bookCard';
import DetailLayout from '../templates/detailLayout';

function BookDetailPage({ books }) {
    const { id } = useParams();
    const detailBook = books[id];
    return (
        <DetailLayout title={'Book Details'}>
            <BookDetailCard
            detailBook={detailBook}
        />
        </DetailLayout>
        
    )
}

export default BookDetailPage;