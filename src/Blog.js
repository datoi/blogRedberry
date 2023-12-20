import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


const Blog = () => {
    const [loginBar, setLoginBar] = useState(false)
    const [popup, setPopup] = useState(false)
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = "c71eb15cb19688ae106987308850fb635cd69a5b7fc29faf11226f54f2667089";
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const responseCategories = await axios.get(`https://api.blog.redberryinternship.ge/api/categories`, config);
            const dataCategories = responseCategories.data.data;

            const dataCategoriesList = dataCategories.map((item) => ({
                id: item.id,
                title: item.title,
                text_color: item.text_color,
                background_color: item.background_color,
            }));

            setCategories(dataCategoriesList);
        };

        fetchData();
    }, []);

    const loginClick = () => {
        setLoginBar(true)
        setPopup(false)
    }

    const navigate = useNavigate()
    const popupClick = () => {
        setPopup(true)
    }
    const navigateClick = () => {
        navigate('addblog')
    }
    const closePopupClick = () => {
        setPopup(false)
    }

    const MoreClick = () => {
        navigate('moreinfo')
    }

    return {
        categories,
        navigateClick,
        popup,
        closePopupClick,
        MoreClick,
        loginClick,
        loginBar,
        popupClick

    }
}


export default Blog