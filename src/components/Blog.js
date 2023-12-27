import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';


const Blog = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedDate, setSelectedDate] = useState('')
    const [isPublished, setPublished] = useState(false);
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [blogs, setBlogs] = useState([])
    const [popup, setPopup] = useState(false)
    const [moreInfo, setMoreInfo] = useState([]);
    const [categories, setCategories] = useState([]);
    const fileInputRef = useRef(null);

    const [fileName, setFileName] = useState(null);

    const [post, setPost] = useState({
        title: '',
        description: '',
        image: null,
        author: '',
        publish_date: '',
        categories: [],
        email: '',
    });
    const token = 'af666e88379c02d142e59bf4c29867b62f165acf90d9e8c356da6c3364adde65 ';

    useEffect(() => {
        // const initData = async () => {
        //     const response = await axios.get(`https://api.blog.redberryinternship.ge/api/token`)
        //     setToken(response.data.token)
        //      ;
        // }
        const updateLocalStorage = () => {
            localStorage.setItem('blogFormData', JSON.stringify(post));
        };
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
    const categoriesFilter = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };
    const filteredBlogs = selectedCategoryId
        ? blogs.filter((blog) =>
            blog.categories.some((category) => category.id === selectedCategoryId)
        )
        : blogs;
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
        setSelectedDate(e.target.value);

        if (e.target.type === 'date' && e.target.value === '') {
            e.target.style.borderColor = 'red';
        } else {
            e.target.style.borderColor = 'green';
        }
    };

    const handleFileInputChange = (e) => {
        setPost(({...post, [e.target.name]: e.target.files[0]}))
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    }
    const handleDelete = () => {
        setFileName(null);
        fileInputRef.current.value = null; // Reset the input
    };

    const handleEmailChange = (e) => {
        setPost(({...post, [e.target.name]: e.target.value}))
    console.log(post )
        const isEmailValid = e.target.value.endsWith("@redberry.ge");
        if (!isEmailValid) {
            e.target.style.borderColor = 'red';
        } else {
            e.target.style.borderColor = 'green';
        }
        setEmail(e.target.value)
    };

    let tmpCategories = [];
    const handleSelectInputChange = (e) => {

        for (let i = 0; i < e.target.options.length; i++) {
            if (e.target.options[i].selected && tmpCategories.indexOf(e.target.options[i].value) === -1) {
                tmpCategories.push(e.target.options[i].value);
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
                'Content-Type': 'multipart/form-data',
            },
        };
        const response = await axios.post('https://api.blog.redberryinternship.ge/api/blogs', postData, config);
        const currentDate = new Date();
        const selectedPublishDate = new Date(selectedDate);
        console.log(selectedPublishDate)
        if (selectedPublishDate <= currentDate) {
            console.log('Content published on:', currentDate);
            setPublished(true);
        } else {
            console.log('Content scheduled for publication on:', selectedPublishDate);
            setPublished(true);
        }
        console.log(post)
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


    const MoreClick = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const responseBlog = await axios.get(`https://api.blog.redberryinternship.ge/api/blogs`, config)
        const dataBlog = responseBlog.data.data

    };

    const navigateClick = () => {
        navigate('/addblog')
    }
    const homeClick = () =>{
        navigate('/blogredberry')
    }

    return {
        categories,
        blogs,
        navigateClick,
        popup,
        closePopupClick,
        MoreClick,
        loginClick,
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
        email,
        categoriesFilter,
        selectedCategoryId,
        filteredBlogs,
        selectedDate,
        isPublished,
        moreInfo,
        homeClick,
        fileName,
        handleDelete,
        fileInputRef
    }
}


export default Blog