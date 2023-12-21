import './MoreInfo.css'
import Blog from "../Blog";

const MoreInfo = () => {
    const {
        navigateClick,
        popup,
        closePopupClick
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
            <div className='more_info_container'>
                <div className='more_info_blogs-container container'>
                    <div className='more_info_blog'>
                        <img className='my-2' src="/unsplash_01_igFr7hd4.jpg" alt=""/>
                        <h5 className='my-2'>ლილე კვარაცხელია</h5>
                        <p className='my-2'>02.11.2023 <span className='my-2'>ელ-ფოსტა</span></p>
                        <h3 className='my-2'>ეოს მრჩეველთა ბლა ბლა ბლააა, ბლა ბლა ბლაა</h3>
                        <button className='my-2'>axios</button>
                        <p className='my-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid atque
                            consequatur dicta
                            doloremque eaque error fugit impedit ipsam itaque labore odio praesentium quam ratione sequi
                            similique, suscipit ullam voluptatibus voluptatum.</p>
                    </div>
                </div>
            </div>

            <div className='blog_slides mt-5'>
                <div className='d-flex justify-content-between mb-3'>
                    <h3>მსგავსი სტატიები</h3>
                    <div>
                        <button><img src="./Arrow 2.png" alt=""/></button>
                        <button><img src="./Arrow 1.png" alt=""/></button>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <div>ბლოგი</div>
                    <div>ბლოგი</div>
                    <div>ბლოგი</div>
                    <div>ბლოგი</div>
                </div>
            </div>
        </div>
    )

}
export default MoreInfo
