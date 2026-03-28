import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from './components/ui/nav-bar';
import { GeneroPage } from './pages/genero-page';
import { DirectorPage } from './pages/director-page';
import { ProductoraPage } from './pages/productora-page';
import { TipoPage } from './pages/tipo-page';
import { MediaPage } from './pages/media-page';
import { Footer } from './components/ui/footer';

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
