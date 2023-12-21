import Blog from "../Blog";

const AddBlog = () => {

    const {
        categories,
        handleSelectInputChange,
        handleFileInputChange,
        handleInputChange,
        post,
        handlePublish
    } = Blog()



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
                <h1>add blog</h1>
            </div>
            <div>
                <label htmlFor="">upload picture</label>
                <input type="file" id="image" name="image" onChange={handleFileInputChange}/>
            </div>
            <div>
                <div>
                    <label htmlFor="">author</label>
                    <input type="text" name="author" onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="">title</label>
                    <input type="text" name="title" onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="">description</label>
                    <input type="text" name="description" onChange={handleInputChange}/>
                </div>
                <div>
                    <div>
                        <label htmlFor="">date</label>
                        <input type="date" name="publish_date" onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="categories">categories</label>
                        <select name="categories" id="categories" multiple onChange={handleSelectInputChange}>
                            {categories.map((category) => (
                                <option key={category.id}>{category.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="">e-mail</label>
                    <input type="email" name="email" onChange={handleInputChange}/>
                </div>

                <div>
                    <button onClick={handlePublish}>publish</button>
                </div>
            </div>
        </div>
    )
}


export default AddBlog