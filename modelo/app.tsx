import { Route, Switch } from 'wouter';
import { Provider } from './components/provider';
import { AgentFeedback, RunableBadge } from '@runablehq/website-runtime';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/home';
import '../web/i18n/index';

function App() {
  return (
    <Provider>
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
      <Footer />
      {import.meta.env.DEV && <AgentFeedback />}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
