import Nav from './components/nav';
import DashboardPage from './pages/Dashboard';
import SerialKeyModal from './components/serialKeyModal';

function App() {
  return (
    <>
      <SerialKeyModal/>
      <Nav/>
      <div id="content" className={`text-light`}>
        <DashboardPage/>
      </div>
    </>
  )
}

export default App