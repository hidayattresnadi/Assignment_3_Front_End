import Container from './container';
import '../../loading.css';

const LoadingSpinner = () => (
    <Container className="loading-spinner">
        <Container className="spinner"></Container>
        <span>Loading...</span>
    </Container>
);

export default LoadingSpinner;
