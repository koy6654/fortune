import { AppProviders } from 'app/providers';
import AppRoutes from 'app/routes';
import { Layout } from 'layout';
import { BrowserRouter } from 'react-router-dom';
import { Bootstrap } from './bootstrap/Bootstrap';

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Bootstrap>
          <Layout>
            <AppRoutes />
          </Layout>
        </Bootstrap>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
