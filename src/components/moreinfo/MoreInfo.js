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
        homeClick

    } = Blog()
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrevClick = () => {
        if (blogs.length > 2) {
            setCurrentSlide((prevSlide) => (prevSlide === 0 ? blogs.length - 3 : prevSlide - 1));
        }
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

            <header className="header">
                <div className='container d-flex justify-content-between'>
                    <div className="logo">
                        <img className='logo-img' src="LOGO-02 3.png" alt="Logo"/>
                    </div>

                    <div className="log-in-button">
                        <button onClick={navigateClick}>შესვლა</button>
                    </div>
                </div>
            </header>
            <div className='blogContainer mt-5'>
            <button onClick={homeClick} className='border-0 bg-transparent'><img className='position-absolute ms-4' src={process.env.PUBLIC_URL + '/Arrow.png'} alt=""/></button>
                    <div  className='blog text-center'>
                        <img src={process.env.PUBLIC_URL + '/unsplash_01_igFr7hd4.jpg'} className='my-2 blog_img' alt=""/>
                        <h5 className='my-2'></h5>
                        <p className='my-2'></p>
                        <h3 className='my-2'></h3>
                            <button  style={{
                            }} className='category-button'>
                            </button>
                        <p className='my-2'></p>
                        <button onClick={MoreClick} className='my-2'>სრულად ნახვა</button>
                    </div>
            </div>

            <div className='blog_slides mt-5'>
                {/* Navigation Arrows */}
                <div className='d-flex justify-content-between mb-3'>
                    <h3>მსგავსი სტატიები</h3>
                    <div>
                        <button
                            className={`border-0 slide_button ${!canSlidePrev ? 'disabled' : ''}`}
                            onClick={canSlidePrev ? handlePrevClick : null}
                            disabled={!canSlidePrev}
                            style={{ backgroundColor: canSlidePrev ? '#5D37F3' : '#E4E3EB' }}
                        >
                            <img src={process.env.PUBLIC_URL + '/Arrow 2.png'} alt='' />
                        </button>
                        <button
                            className={`border-0 slide_button ${!canSlideNext ? 'disabled' : ''}`}
                            onClick={canSlideNext ? handleNextClick : null}
                            disabled={!canSlideNext}
                            style={{ backgroundColor: canSlideNext ? '#5D37F3' : '#E4E3EB' }}
                        >
                            <img className='' src={process.env.PUBLIC_URL + '/Arrow 1.png'} alt='' />
                        </button>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    {blogs.slice(currentSlide, currentSlide + 3).map((blog, index) => (
                        <div key={index} className='blog text-center'>
                            <img style={{width: '200px'}} src={blog.image} className='my-2 blog_slide_img' alt='' />
                            <h5 className='my-2'>{blog.title}</h5>
                            <p className='my-2'>{blog.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}
export default MoreInfo
