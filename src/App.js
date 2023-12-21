import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./components/homepage/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddBlog from "./components/addblog/AddBlog";
import MoreInfo from "./components/moreinfo/MoreInfo";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/blogredberry' element={<HomePage/>}/>
                <Route path='/addblog' element={<AddBlog/>}/>
                <Route path='/moreinfo' element={<MoreInfo/>}/>
            </Routes>
        </BrowserRouter>
    )

}

export default App;
