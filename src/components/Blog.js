import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import {json, useNavigate} from 'react-router-dom';


const Blog = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [selectedDate, setSelectedDate] = useState('')
    const [isPublished, setPublished] = useState(false);
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [loginBar, setLoginBar] = useState(false)
    const [blogs, setBlogs] = useState([])
    const [popup, setPopup] = useState(false)
    const [categories, setCategories] = useState([]);
    const fileInputRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [loginErrorText, setLoginErrorText] = useState(false)
    const [successPopup, setSuccessPopup] = useState(false)

    const [post, setPost] = useState({
        title: '',
        description: '',
        image: null,
        author: '',
        publish_date: '',
        categories: [],
        email: '',
    });
    const truncateStyle = {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        WebkitLineClamp: 2,
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '28px',
        letterSpacing: '0em',
        textAlign: 'left',
        color: '#404049'
    };


    const token = localStorage.getItem('token');

    useEffect(() => {
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
        fetchData();

        if (localStorage.getItem('isLoggedIn') === '1') {
            setLoginBar(true);
        }
    }, []);
    const fetchCategoryTitle = (categoryId) => {
        const matchingCategory = categories.find(category => category.id === categoryId);
        return matchingCategory ? matchingCategory.title : '';
    };
    const handleBlogCategoryClick = (categoryId) => {
        categoriesFilter(categoryId);
        setIsActive(current => !current);
    };
    const categoriesFilter = (categoryId) => {
        setSelectedCategoryId(categoryId);
        const isCategorySelected = selectedCategoryIds.includes(categoryId);

        setSelectedCategoryIds((prevSelectedIds) =>
            isCategorySelected
                ? prevSelectedIds.filter((id) => id !== categoryId)
                : [...prevSelectedIds, categoryId]
        );

    };
    const filteredBlogs = selectedCategoryIds.length
        ? blogs.filter((blog) =>
            blog.categories.some((category) => selectedCategoryIds.includes(category.id))
        )
        : blogs;
    useEffect(() => {
        setAuthor(localStorage.getItem("author") ?? '');
        setTitle(localStorage.getItem("title") ?? '');
        setDescription(localStorage.getItem("description") ?? '');
        setSelectedDate(localStorage.getItem("date") ?? '');
        setFileName(null);
        setSelectedCategoryId(JSON.parse(localStorage.getItem("categories")) ?? []);
        setEmail(localStorage.getItem("email") ?? '');

        setPost({
            author: localStorage.getItem("author") ?? '',
            title: localStorage.getItem("title") ?? '',
            description: localStorage.getItem("description") ?? '',
            publish_date: localStorage.getItem("date") ?? '',
            image: localStorage.getItem("file") ?? '',
            email: localStorage.getItem("email") ?? '',
            categories: JSON.parse(localStorage.getItem("categories")) ?? []
        });

    }, []);
    const handleAuthorChange = (e) => {
        setPost(({...post, [e.target.name]: e.target.value}))
        setAuthor(e.target.value)
        localStorage.setItem("author", e.target.value);
    };
    const handleTitleChange = (e) => {
        setPost(({...post, [e.target.name]: e.target.value}))
        setTitle(e.target.value)
        localStorage.setItem("title", e.target.value);

    };
    const handleDescriptionChange = (e) => {
        setPost(({...post, [e.target.name]: e.target.value}))
        setDescription(e.target.value)
        localStorage.setItem("description", e.target.value);

    };
    const handleDateChange = (e) => {
        setPost(({...post, [e.target.name]: e.target.value}));
        setSelectedDate(e.target.value);
        localStorage.setItem("date", e.target.value);

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
        localStorage.setItem("file", e.target.value);

    }
    const handleDelete = () => {
        setFileName(null);
        fileInputRef.current.value = null;
    };

    const handleEmailChange = (e) => {
        setPost(({...post, [e.target.name]: e.target.value}))
        const isEmailValid = e.target.value.endsWith("@redberry.ge");
        if (!isEmailValid) {
            e.target.style.borderColor = 'red';
        } else {
            e.target.style.borderColor = 'green';
        }
        setEmail(e.target.value)
        localStorage.setItem("email", e.target.value);
        console.log(post)
    };

    const handleSelectInputChange = (e) => {
        setPost((prevPost) => {
            return {
                ...prevPost,
                categories: e,
            };
        });

        if (post.categories.length === 0) {
            document.getElementById('select').style.borderColor = 'red';
        } else {
            document.getElementById('select').style.borderColor = 'green';
        }
        localStorage.setItem("categories", JSON.stringify(e));

    };


    const handlePublish = async () => {
        const postData = new FormData();
        postData.append('title', post.title);
        postData.append('description', post.description);
        postData.append('image', post.image);
        postData.append('author', post.author);
        postData.append('publish_date', post.publish_date);
        postData.append('email', post.email);

        for (let i = 0; i < post.categories.length; i++) {
            postData.append('categories[]', post.categories[i].id);
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
        setPopup(true)
    };


    const loginClick = async () => {
        try {
            const response = await axios.post('https://api.blog.redberryinternship.ge/api/login', {
                email: login
            });

            setLoginBar(true);
            setPopup(false);
            localStorage.setItem('isLoggedIn', 1);
            setSuccessPopup(true)
        } catch (ex) {

            const emailInput = document.getElementById('loginInput');
            if (emailInput) {
                emailInput.style.borderColor = 'red';
                emailInput.style.backgroundColor = '#ffebee';
            }
            setLoginErrorText(true)
            setSuccessPopup(false)
        }
    };


    const loginType = (e) => {
        setLogin(e.target.value)

    }


    const navigate = useNavigate()
    const popupClick = () => {
        setPopup(true)
    }

    const closePopupClick = () => {
        setPopup(false)
        setSuccessPopup(false)
    }


    const MoreClick = (item) => {
        navigate('/moreinfo/' + item.id)
    };


    const navigateClick = () => {
        navigate('/addblog')
    }
    const homeClick = () => {
        navigate('/blogredberry')
    }
    const clearStorage = () => {
        navigate('/blogredberry')
        setAuthor('');
        localStorage.removeItem("author")
        setTitle('');
        localStorage.removeItem("title")
        setDescription('');
        localStorage.removeItem("description")
        setSelectedDate('');
        localStorage.removeItem("date")
        setFileName('');
        localStorage.removeItem("file")
        setSelectedCategoryId([]);
        (localStorage.removeItem("categories"))
        setEmail('');
        localStorage.removeItem("email")
        setPost({});

    }
    const handleTyping = () => {
        setIsTyping(true);
    };
    const handleBlur = () => {
        setIsTyping(false);
    };
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
        homeClick,
        fileName,
        handleDelete,
        fileInputRef,
        navigate,
        fetchCategoryTitle,
        handleBlogCategoryClick,
        isTyping,
        handleTyping,
        handleBlur,
        truncateStyle,
        loginBar,
        isActive,
        selectedCategoryIds,
        loginErrorText,
        successPopup,
        clearStorage
    }
}


export default Blog