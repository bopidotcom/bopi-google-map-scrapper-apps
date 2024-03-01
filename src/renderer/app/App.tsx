import Nav from './components/nav';
import DashboardPage from './pages/Dashboard';

function App() {
  return (
    <>
      <Nav/>
      <div id="content" className={`text-light`}>
        <DashboardPage/>
      </div>
    </>
  )
}

export default App