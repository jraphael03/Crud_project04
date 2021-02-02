import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";


// PAGES
import Questions from "./pages/Questions";
import SignIn from "./pages/SignIn";
import NotFoundPage from './pages/404';
import Sidebar from './pages/Sidebar'

function App() {
  return (
    <Router>
      <html>
        <body>
          <div className="grid-container">
            <header className="row center">
              <Link to="/">
                <h1>Sports Questions</h1>
              </Link>
            </header>
            <nav>
              <a href="">
                <Link to="/">Register/Sign In</Link>
              </a>
              <a href="">
                <Link to="/questions">Questions Page</Link>
              </a>
            </nav>
            <aside>
              <Sidebar />
            </aside>
            <main className="row center">
              <div className="card">
                <Switch>
                  <Route exact path="/" component={SignIn} />
                  <Route exact path="/questions" component={Questions} />
                  <Route exact path="/404" component={NotFoundPage} />
                  <Route exact path="/404/" />
                </Switch>
              </div>
            </main>
            <footer className="row center">
              <h3>Footer</h3>
            </footer>
          </div>
        </body>
      </html>
    </Router>
  );
}

export default App;
