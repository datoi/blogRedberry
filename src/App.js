import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./components/homepage/HomePage";
import { HashRouter, Route, Routes} from "react-router-dom";
import AddBlog from "./components/addblog/AddBlog";
import MoreInfo from "./components/moreinfo/MoreInfo";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
    const [token, setToken] = useState();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        } else {
            axios.get(`https://api.blog.redberryinternship.ge/api/token`)
                .then(response => {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                })
        }
    }, [])

    return (
        <HashRouter>
            <Routes>
                <Route path='/blogredberry' element={<HomePage/>}/>
                <Route path='/addblog' element={<AddBlog/>}/>
                <Route path='/moreinfo/:blogId' element={<MoreInfo/>}/>
            </Routes>
        </HashRouter>
    )

}

export default App;
