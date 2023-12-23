import Blog from "../Blog";

const AddBlog = () => {

    const {
        categories,
        handleSelectInputChange,
        handleFileInputChange,
        handleAuthorChange,
        handleTitleChange,
        handlePublish,
        author,
        title,
        handleDescriptionChange,
        description,
        handleDateChange,
        handleEmailChange,
        email
    } = Blog()
    const isOnlyGeorgian = /^[ა-ჰ\s]+$/u.test(author);

    const isEmailValid = email.endsWith("@redberry.ge");

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
                <label htmlFor="">ფოტოს ატვირთვა</label>
                <input type="file" id="image" name="image" onChange={handleFileInputChange}/>
            </div>
            <div>
                <div>
                    <label htmlFor="">ავტორი</label>
                    <input style={{ borderColor: author.trim().length === 0 ? 'grey' : author.trim().split(/\s+/).length > 1 ? 'green' : 'red' }} type="text" name="author" onChange={handleAuthorChange}/>
                    <p style={{
                        color: author.trim().length === 0
                            ? 'grey'
                            : author.replace(/\s/g, "").length < 4
                                ? 'red'
                                : 'green'
                    }}>
                        მინიმუმ ოთხი სიმბოლო
                    </p>
                    <p style={{ color: author.trim().length === 0 ? 'grey' : author.trim().split(/\s+/).length > 1 ? 'green' : 'red' }}>
                        მინიმუმ ორი სიტყვა
                    </p>
                    <p style={{
                        color: author.trim().length === 0 ? 'grey' : isOnlyGeorgian ? 'green' : 'red'
                    }}>
                        მხოლოდ ქართული სიმბოლოები
                    </p>
                </div>
                <div>
                    <label htmlFor="">სათაური</label>
                    <input style={{
                        borderColor: title.trim().length === 0
                            ? 'grey'
                            : title.replace(/\s/g, "").length < 4
                                ? 'red'
                                : 'green'
                    }} type="text" name="title" onChange={handleTitleChange}/>
                    <p style={{
                        color: title.trim().length === 0
                            ? 'grey'
                            : title.replace(/\s/g, "").length < 4
                                ? 'red'
                                : 'green'
                    }}>
                        მინიმუმ ოთხი სიმბოლო
                    </p>
                </div>
                <div>
                    <label htmlFor="">აღწერა</label>
                    <input type="text" name="description" onChange={handleDescriptionChange}/>
                    <p style={{
                        color: description.trim().length === 0
                            ? 'grey'
                            : description.replace(/\s/g, "").length < 4
                                ? 'red'
                                : 'green'
                    }}>
                        მინიმუმ ოთხი სიმბოლო
                    </p>
                </div>
                <div>
                    <div>
                        <label htmlFor="">გამოყვექნების თარიღი</label>
                        <input type="date" name="publish_date" onChange={handleDateChange}/>
                    </div>
                    <div>
                        <label htmlFor="categories">კატეგორიები</label>
                        <select name="categories" id="categories" multiple onChange={handleSelectInputChange}>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="">ელ-ფოსტა</label>
                    <input onChange={handleEmailChange} type="email" name="email" />
                    {isEmailValid ? null: <p style={{color: 'red'}}><img src="" alt=""/>მეილი უნდა მთავრდებოდეს @redberry.ge-ით</p>}
                </div>

                <div>
                    <button onClick={handlePublish}>გამოქვეყნება</button>
                </div>
            </div>
        </div>
    )
}


export default AddBlog