import './MoreInfo.css'
import Blog from "../Blog";
import {useState} from "react";


const MoreInfo = () => {
    const {
        navigateClick,
        popup,
        closePopupClick,
        MoreClick,
        blogs,
        homeClick,
        popupClick,
        loginBar,
        navigate,
        truncateStyle
    } = Blog()
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrevClick = () => {
        if (blogs.length > 2) {
            setCurrentSlide((prevSlide) => (prevSlide === 0 ? blogs.length - 3 : prevSlide - 1));
        }
        console.log(loginBar)
    };

    const handleNextClick = () => {
        if (blogs.length > 2) {
            setCurrentSlide((prevSlide) => (prevSlide === blogs.length - 3 ? 0 : prevSlide + 1));
        }
    };
    const canSlidePrev = blogs.length > 2 && currentSlide > 0;
    const canSlideNext = blogs.length > 2 && currentSlide < blogs.length - 3;
    return (
        <div>
            {popup ? <div>
                <div className='popup_Window'>
                    <header>
                        <button onClick={closePopupClick}>x</button>
                    </header>
                    <div>
                        <p>ელ-ფოსტა</p>
                        <input type="text"/>
                    </div>
                    <div>
                        <button>შესვლა</button>
                    </div>
                </div>
            </div> : null}

            <header className="header py-3 fixed-top">
                <div className='container d-flex justify-content-between'>
                    <div className="logo">
                        <button onClick={() => {
                            navigate('/blogredberry')
                        }
                        } className='border-0 bg-transparent'><img style={{borderRadius: '0'}} className='logo-img'
                                                                   src={process.env.PUBLIC_URL + '/LOGO-02 3.png'}
                                                                   alt="Logo"/>
                        </button>
                    </div>

                    <div className="">
                        {loginBar ? <button onClick={navigateClick}>დაამატე ბლოგი</button> :
                            <button onClick={popupClick}>შესვლა</button>}
                    </div>
                </div>
            </header>
            <div style={{marginTop:'100px'}} className='d-flex justify-content-between'>
                <div style={{zIndex: '0',}} className=''>
                    <button style={{ position: 'absolute', marginLeft:'320px'}} onClick={homeClick}
                            className='border-0 bg-transparent'><img
                        className=''
                        src={process.env.PUBLIC_URL + '/Arrow.png'}
                        alt=""/></button>
                </div>
                <div className='blog_container'>
                    <div style={{width: '720px'}} className='blog'>
                        <img src={process.env.PUBLIC_URL + '/unsplash_01_igFr7hd4.jpg'} className='my-2 blog_img'
                             alt=""/>
                        <h5 className='my-2'>ლილე კვარაცხელია</h5>
                        <p className='my-2'>02.11.2023 . lile.kvaratskhelia@redberry.ge</p>
                        <h3 className='my-2'>მობილური ფოტოგრაფიის კონკურსის გამარჯვებულთა ვინაობა ცნობილია</h3>
                        <button style={{}} className='category-button'>
                            კატეგორიები
                        </button>
                        <p className='my-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad
                            adipisci
                            amet, animi architecto cumque delectus dignissimos doloremque labore laboriosam laborum,
                            mollitia nemo neque nobis quas quisquam sit velit, voluptate?</p>
                        <button onClick={MoreClick} className='my-2'>სრულად ნახვა</button>
                    </div>
                </div>
                <div></div>
            </div>

            <div className='blog_slides container mt-5'>
                <div className='d-flex justify-content-between mb-3'>
                    <h3>მსგავსი სტატიები</h3>
                    <div>
                        <button
                            className={`border-0 slide_button ${!canSlidePrev ? 'disabled' : ''}`}
                            onClick={canSlidePrev ? handlePrevClick : null}
                            disabled={!canSlidePrev}
                            style={{backgroundColor: canSlidePrev ? '#5D37F3' : '#E4E3EB'}}
                        >
                            <img src={process.env.PUBLIC_URL + '/Arrow 2.png'} alt=''/>
                        </button>
                        <button
                            className={`border-0 slide_button ${!canSlideNext ? 'disabled' : ''}`}
                            onClick={canSlideNext ? handleNextClick : null}
                            disabled={!canSlideNext}
                            style={{backgroundColor: canSlideNext ? '#5D37F3' : '#E4E3EB'}}
                        >
                            <img className='' src={process.env.PUBLIC_URL + '/Arrow 1.png'} alt=''/>
                        </button>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    {blogs.slice(currentSlide, currentSlide + 3).map((item, index) => (
                        <div key={index} className='blog text-center mx-2'>
                            <img src={item.image} className='my-2 blog_slide_img' alt=""/>
                            <h5 className='my-2'>{item.author}</h5>
                            <p className='my-2'>{item.publish_date}</p>
                            <h3 className='my-2'>{item.title}</h3>
                            {item.categories.map(category => (
                                <button key={category.id} style={{
                                    color: category.text_color,
                                    backgroundColor: category.background_color
                                }} className='category-button'>
                                    {category.id}
                                </button>
                            ))}
                            <p style={truncateStyle} className='my-2'>{item.description}</p>
                            <button onClick={() => MoreClick(item)} className='my-2'>სრულად ნახვა</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}
export default MoreInfo
