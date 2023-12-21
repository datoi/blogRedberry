import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


const Blog = () => {
    const [blogs, setBlogs] = useState(null)
    const [loginBar, setLoginBar] = useState(false)
    const [popup, setPopup] = useState(false)
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState(null);
    const [post, setPost] = useState({
        title: '',
        description: '',
        image: null,
        author: '',
        publish_date: '',
        categories: [],
        email: '',
    });

    useEffect(() => {
        const initData = async () => {
            const response = await axios.get(`https://api.blog.redberryinternship.ge/api/token`)

            setToken(response.data.token);

            await fetchData(response.data.token);
        }

        const fetchData = async (token) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const responseBlog = await axios.get(`https://api.blog.redberryinternship.ge/api/blogs`, config)
            const dataBlog = responseBlog.data.data

            const dataBlogList = dataBlog.map((item) => ({
                id: item.id,
                title: item.title,
                description: item.description,
                image: item.image,
                publish_date: item.publish_date,
                categories: item.categories.map(category => ({
                    id: category.id,
                    name: category.name,
                    text_color: category.text_color,
                    background_color: category.background_color
                })),
                author: item.author
            }))
            setBlogs(dataBlogList)


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

        initData();
    }, []);
    const handleInputChange = (e) => {
        setPost(({...post, [e.target.name]: e.target.value}))
    };

    const handleFileInputChange = (e) => {
        setPost(({...post, [e.target.name]: e.target.files[0]}))
    }

    const handleSelectInputChange = (e) => {
        let tmpCategories = [];

        for (let i = 0; i < e.target.options.length; i++) {
            if (e.target.options[i].selected && tmpCategories.indexOf(e.target.options[i].value) === -1) {
                tmpCategories.push(e.target.options[i].value);
            }
        }

        setPost(({...post, categories: tmpCategories}))
        console.log(tmpCategories)
    }


    const handlePublish = async () => {
        navigate('/blogredberry')
        const postData = new FormData();
        postData.append('title', post.title);
        postData.append('description', post.description);
        postData.append('image', post.image);
        postData.append('author', post.author);
        postData.append('publish_date', post.publish_date);
        postData.append('email', post.email);

        for (let i = 0; i < post.categories.length; i++) {
            postData.append('categories[]', post.categories[i]);
        }

        const response = await axios.post('https://api.blog.redberryinternship.ge/api/blogs', postData);
    };


    const loginClick = () => {
        setLoginBar(true)
        setPopup(false)
    }

    const navigate = useNavigate()
    const popupClick = () => {
        setPopup(true)
    }

    const closePopupClick = () => {
        setPopup(false)
    }

    const MoreClick = () => {
        navigate('/moreinfo')
    }
    const navigateClick = () => {
        navigate('/addblog')
    }

    return {
        categories,
        blogs,
        navigateClick,
        popup,
        closePopupClick,
        MoreClick,
        loginClick,
        loginBar,
        popupClick,
        handleInputChange,
        handleFileInputChange,
        handleSelectInputChange,
        post,
        handlePublish,

    }
}


export default Blog