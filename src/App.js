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
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/addblog' element={<AddBlog/>}></Route>
                <Route path='/moreinfo' element={<MoreInfo/>}></Route>
            </Routes>
        </BrowserRouter>
    )

}

export default App;
