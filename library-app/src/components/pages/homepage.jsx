import '../../dashboard.css'
import Container from '../elements/container';
import Icon from '../elements/icon';
import Text from '../elements/text';
function HomePage({totalMembers, totalBooks}) {
    return (
        <>
        <Container className='dashboard-container'>
        <h1 className='text-center'>Library Dashboard</h1>
        <Container className='dashboard-grid'>
            <Container className='card'>
                <Icon className='fas fa-users fa-2x'></Icon>
                <h2>Total Members</h2>
                <Text>{totalMembers}</Text>
            </Container>
            <Container className='card'>
                <Icon className='fas fa-book fa-2x'></Icon>
                <h2>Total Books</h2>
                <Text>{totalBooks}</Text>
            </Container>
        </Container>
    </Container>
    </>
    )
}

export default HomePage;