import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';


const Blog = () => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [blogs, setBlogs] = useState([])
    const [loginBar, setLoginBar] = useState(false)
    const [popup, setPopup] = useState(false)
    const [categories, setCategories] = useState([]);
    // const [token, setToken] = useState(null);
    const [post, setPost] = useState({
        title: '',
        description: '',
        image: null,
        author: '',
        publish_date: '',
        categories: [],
        email: '',
    });
    const token = 'a253a4fe0494517eab9d3bd834386e6c22c24fb836f424260d6392f3730ff7c8';

    useEffect(() => {
        // const initData = async () => {
        //     const response = await axios.get(`https://api.blog.redberryinternship.ge/api/token`)
        //     setToken(response.data.token)
        //      ;
        // }

        const fetchData = async () => {

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
        fetchData()
        // initData();
    }, []);


    const handleAuthorChange = (e) => {
        setPost(({...post, [e.target.name]: e.target.value}))
        setAuthor(e.target.value)


    };
    const handleTitleChange = (e) => {
        setPost(({...post, [e.target.name]: e.target.value}))
        setTitle(e.target.value)
    };
    const handleDescriptionChange = (e) => {
        setPost(({...post, [e.target.name]: e.target.value}))
        setDescription(e.target.value)
    };
    const handleDateChange = (e) => {
        setPost(({...post, [e.target.name]: e.target.value}));

        if (e.target.type === 'date' && e.target.value === '') {
            e.target.style.borderColor = 'red';
        } else {
            e.target.style.borderColor = 'green';
        }
    };

    const handleFileInputChange = (e) => {
        setPost(({...post, [e.target.name]: e.target.files[0]}))
    }

    const handleEmailChange = (e) => {
        setPost(({...post, [e.target.name]: e.target.value}))

        const isEmailValid = e.target.value.endsWith("@redberry.ge");
        if (!isEmailValid) {
            e.target.style.borderColor = 'red';
        } else {
            e.target.style.borderColor = 'green';
        }
        setEmail(e.target.value)
    };

    const handleSelectInputChange = (e) => {
        let tmpCategories = [];

        for (let i = 0; i < e.target.options.length; i++) {
            if (e.target.options[i].selected && tmpCategories.indexOf(e.target.options[i].value) === -1) {
                tmpCategories.push(e.target.options[i].value, e.target.value);
            }
        }

        setPost(({...post, categories: tmpCategories}))
        if (tmpCategories.length === 0) {
            e.target.style.borderColor = 'red';
        } else {
            e.target.style.borderColor = 'green';
        }
    };


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
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post('https://api.blog.redberryinternship.ge/api/blogs', postData, config);

    };


    const loginClick = async () => {
        const response = await axios.post('https://api.blog.redberryinternship.ge/api/login');
        const responseData = response.data;
        const apiEmail = responseData.email;
    };

    const loginType = (e) => {
        setLogin(e.target.value)
        console.log(e.target.value)
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
        handleAuthorChange,
        handleFileInputChange,
        handleSelectInputChange,
        post,
        handlePublish,
        loginType,
        author,
        handleTitleChange,
        title,
        handleDescriptionChange,
        description,
        handleDateChange,
        handleEmailChange,
        email
    }
}


export default Blog