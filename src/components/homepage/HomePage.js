import './HomePage.css'
import Blog from "../Blog";
import {useState} from "react";


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
        selectedCategoryIds,
        filteredBlogs,
        categoriesFilter,
        fetchCategoryTitle,
        handleBlogCategoryClick,
        truncateStyle,
        isActive

    } = Blog()

    const [isTyping, setIsTyping] = useState(false);

    const loginType = () => {
        setIsTyping(true);
    };

    return (
        <div>
            {popup ? <div>
                <div className='overlay'></div>
                <div className='popup_Window position-fixed container px-4'>
                    <header className='d-flex justify-content-end'>
                        <button className='x_button border-0 mt-3 bg-transparent' onClick={closePopupClick}><img src={process.env.PUBLIC_URL + '/add.png'}
                                                                                                            alt=""/></button>
                    </header>
                    <div>
                        <h3 className='login_title mb-4'>შესვლა</h3>
                    </div>
                    <div className='mb-4'>
                        <p className='mail_reference text-start my-1'>ელ-ფოსტა</p>
                        <input
                            className='mail_input ps-3'
                            placeholder='Example@redberry.ge'
                            onChange={loginType}
                            type="text"
                            style={{
                                borderColor: isTyping ? '#5D37F3' : '#ccc',
                                borderWidth: '2px',
                                borderStyle: 'solid',
                                outline: 'none',
                            }}
                        />
                    </div>
                    <div>
                        <button className='popup_login border-0' onClick={loginClick}>შესვლა</button>
                    </div>
                </div>
            </div> : null}
            <header className="header py-3 fixed-top">
                <div className='container d-flex justify-content-between'>
                    <div className="logo">
                        <button onClick={() => {
                            window.location.reload();
                        }
                        } className='border-0 bg-transparent'><img style={{borderRadius: '0'}} className='logo-img'
                                                                   src={process.env.PUBLIC_URL + '/LOGO-02 3.png'}
                                                                   alt="Logo"/>
                        </button>
                    </div>

                    <div className="">
                        {loginBar ? <button onClick={navigateClick}>დაამატე ბლოგი</button> :
                            <button className='login border-0' onClick={popupClick}>შესვლა</button>}
                    </div>
                </div>
            </header>

            <div style={{marginTop: '90px'}} className='container align-items-center'>
                <div className='d-flex justify-content-between w-100'>
                    <h1 className='page_title d-flex align-items-center'></h1>
                    <img className='page_image' src={process.env.PUBLIC_URL + '/Blog-1024x355 1.jpg'} alt=""/>
                </div>
            </div>
            <div className='container categories my-5' style={{ overflowX: 'auto' }}>
                <div className="d-flex">
                    {categories.map((category) => (
                        <button
                            onClick={() => categoriesFilter(category.id)}
                            key={category.id}
                            value={category.id}
                            style={{
                                color: category.text_color,
                                backgroundColor: category.background_color,
                                whiteSpace: 'nowrap',
                                minWidth: 'auto',
                                padding: '8px 12px',
                                fontSize: '12px',
                                border: selectedCategoryIds.includes(category.id) ? '1px solid black' : 'none',
                            }}
                            className={`filter-button m-2 ${selectedCategoryIds.includes(category.id) ? 'active' : ''}`}
                        >
                            {category.title}
                        </button>
                    ))}
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {filteredBlogs.map((item) => (
                        <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                            <div className="blog">
                                <img src={item.image} className="my-2 blog-img" alt=""/>
                                <h5 className="author my-2">{item.author}</h5>
                                <p className="my-2 publish_date">{item.publish_date}</p>
                                <h3 className="my-2 title">{item.title}</h3>
                                <div>
                                    {item.categories.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleBlogCategoryClick(category.id)}
                                            style={{
                                                color: category.text_color,
                                                backgroundColor: category.background_color,
                                                whiteSpace: 'nowrap',
                                                minWidth: 'auto',
                                                padding: '8px 12px',
                                                fontSize: '12px',
                                            }}
                                            className={`filter-button me-1 my-1 border-0`}
                                        >
                                            {fetchCategoryTitle(category.id)}
                                        </button>
                                    ))}
                                </div>
                                <p className="description my-2" style={truncateStyle}>{item.description}</p>
                                <button onClick={() => MoreClick(item)} className="more_button my-2 border-0 bg-transparent">სრულად ნახვა <img src={process.env.PUBLIC_URL + '/morearrow.png'}
                                                                                                           alt=""/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
}
export default HomePage