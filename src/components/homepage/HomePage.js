    import './HomePage.css'
    import Blog from "../Blog";

    const HomePage = () => {
        const {
            categories,
            navigateClick,
            popup,
            closePopupClick,
            MoreClick,
            loginClick,
            loginBar,
            popupClick,
            blogs,
            loginType,
        } = Blog()
        return (
            <div>
                {popup ? <div>
                    <div className='popup_Window'>
                        <header>
                            <button onClick={closePopupClick}>x</button>
                        </header>
                        <div>
                            <p>ელ-ფოსტა</p>
                            <input onChange={loginType} type="text"/>
                        </div>
                        <div>
                            <button onClick={loginClick}>შესვლა</button>
                        </div>
                    </div>
                </div> : null}
                <header className="header">
                    <div className='container d-flex justify-content-between'>
                        <div className="logo">
                            <img className='logo-img' src="/LOGO-02 3.png" alt="Logo"/>
                        </div>

                        <div className="">
                            {loginBar ? <button onClick={navigateClick}>დაამატე ბლოგი</button> :
                                <button onClick={popupClick}>შესვლა</button>}
                        </div>
                    </div>
                </header>

                <div className='container'>
                    <div className='d-flex justify-content-between'>
                        <h1>ბლოგი</h1>
                        <img src="/Blog-1024x355%201.jpg" alt=""/>
                    </div>

                </div>
                <div className='categories mt-5'>
                    {categories.map((category) => (
                        <button key={category.id} value={category.id} className="filter-button m-2">
                            {category.title}
                        </button>
                    ))}
                </div>
                <div className='d-flex justify-content-center mt-5'>
                    {blogs.map((item) => (
                        <div key={item.id} className='blogs-container'>
                            <div className='blog'>
                                <img src={item.image} className='my-2 blog-img' alt=""/>
                                <h5 className='my-2'>{item.author}</h5>

                                <p className='my-2'>{item.publish_date}</p>
                                <h3 className='my-2'>{item.title}</h3>
                                    {item.categories.map(category => (
                                        <button key={category.id} style={{ color: category.text_color, backgroundColor: category.background_color }} className='category-button'>
                            {category.id}
                        </button>
                                    ))}
                                <p className='my-2'>{item.description}</p>
                                <button onClick={MoreClick} className='my-2'>სრულად ნახვა</button>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        );
    }
    export default HomePage