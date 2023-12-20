import Blog from "../../Blog"
import './HomePage.css'

const HomePage = () => {
    const {
        categories,
        navigateClick,
        popup,
        closePopupClick,
        MoreClick,
        loginClick,
        loginBar,
        popupClick
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
                        {loginBar ? <button onClick={navigateClick}>დაამატე ბლოგი</button> : <button onClick={popupClick}>შესვლა</button>}
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
                    <button key={category.id} className="filter-button m-2">
                        {category.title}
                    </button>
                ))}
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <div className='blogs-container'>
                    <div className='blog'>
                        <img className='my-2' src="/unsplash_01_igFr7hd4.jpg" alt=""/>
                        <h5 className='my-2'>ლილე კვარაცხელია</h5>

                        <span className='my-2'>02.11.2023<p className='my-2'>ელ-ფოსტა</p></span>
                        <h3 className='my-2'>ეოს მრჩეველთა ბლა ბლა ბლააა, ბლა ბლა ბლაა</h3>
                        <button className='my-2'>axios</button>
                        <p className='my-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid atque
                            consequatur dicta
                            doloremque eaque error fugit impedit ipsam itaque labore odio praesentium quam ratione sequi
                            similique, suscipit ullam voluptatibus voluptatum.</p>
                        <button onClick={MoreClick} className='my-2'>სრულად ნახვა</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default HomePage