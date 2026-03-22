import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from './components/ui/NavBar';
import { GeneroPage } from './pages/GeneroPage';
import { DirectorPage } from './pages/DirectorPage';
import { ProductoraPage } from './pages/ProductoraPage';
import { TipoPage } from './pages/TipoPage';
import { MediaPage } from './pages/MediaPage';
import { Footer } from './components/ui/Footer';

export const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="container mt-4 mb-5">
        <Switch>
          <Route exact path="/generos" component={GeneroPage} />
          <Route exact path="/directores" component={DirectorPage} />
          <Route exact path="/productoras" component={ProductoraPage} />
          <Route exact path="/tipos" component={TipoPage} />
          <Route exact path="/media" component={MediaPage} />
          <Route exact path="/" component={MediaPage} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
