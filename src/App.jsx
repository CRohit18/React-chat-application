import { Provider } from "react-redux";
import store from "./store";
import Routes from "./routes";
import PageLoader from "./components/common/loaders/PageLoader";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const App = () => {
  return (
    <Provider store={store}>
      <Routes />
      <PageLoader />
    </Provider>
  );
};
export default App;
