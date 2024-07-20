import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import './App.css';
import Index from './TableSearch/Index';
import Employee from './Employee/create.js';
import ShowPage from './Employee/showPage.js';
import EmployeeIndex from './Employee/Index.js';
import Empty from './Employee/empty.js';

function App() {
  return (
    <div className={`text-cente`}>
      <BrowserRouter>
        <div className='pt-5'>
          <Routes>
          <Route path="/" element={<Navigate to="/login" replace />}/>
            <Route path="/login" element={<Empty/>} />
            <Route path="employee" element={<Empty/>}>
            <Route index element={<Navigate to="index" />}/>
              <Route path="index" element={<EmployeeIndex/>}/> 
              <Route path="create" element={<Employee/>}/> 
              <Route path="show/:id" element={<ShowPage/>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
