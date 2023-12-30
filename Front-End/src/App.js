import 'bootstrap/dist/css/bootstrap.min.css';
import DashBoard from './Components/DashBoard';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactDisplay from './Components/ContactDisplay';
import AddContact from './Components/AddContact';
import AddEdit from './Components/AddEdit';
import ViewContact from './Components/ViewContact';


function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashBoard />}/>
          <Route path='/ContactDetails' element={<ContactDisplay />}/>
          <Route path='/AddContact' element={<AddContact />} />
          <Route path='/updateContact/:id' element={<AddEdit />} />
          <Route path='/ContactDetails/:id' element={<ViewContact />}/>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
