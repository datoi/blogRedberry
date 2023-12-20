const AddBlog = () => {
    return (
        <div className="add_blog_container">
            <header className="header">
                <div className='container d-flex justify-content-center'>
                    <div className="logo">
                        <img className='logo-img' src="/LOGO-02 3.png" alt="Logo"/>
                    </div>
                </div>
            </header>
            <div>
                <h1>ბლოგის დამატება</h1>
            </div>
            <div>
                <label htmlFor="">ატვირთეთ ფოტო</label>
                <input type="file"/>
            </div>
            <div>
                <div>
                    <label htmlFor="">ავტორი</label>
                    <input type="text"/>
                </div>
                <div>
                    <label htmlFor="">სათაური</label>
                    <input type="text"/>
                </div>
                <div>
                    <label htmlFor="">აღწერა</label>
                    <input type="text"/>
                </div>
                <div>
                    <div>
                        <label htmlFor="">გამოქვეყნების თარიღ</label>
                        <input type="date"/>
                    </div>
                    <div>
                        <label htmlFor="">კატეგორია</label>
                        <select name="" id="">
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="">ელ-ფოსტა</label>
                    <input type="email"/>
                </div>
                <div>
                    <button>გამოქვეყნება</button>
                </div>
            </div>
        </div>
    )
}


export default AddBlog