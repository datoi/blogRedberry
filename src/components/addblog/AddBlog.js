import Blog from "../Blog";
import './AddBlog.css';
import {useRef, useState, useEffect} from "react";

const AddBlog = () => {
    const {
        categories,
        handleSelectInputChange,
        handleAuthorChange,
        handleTitleChange,
        handlePublish,
        author,
        title,
        handleDescriptionChange,
        description,
        handleDateChange,
        handleEmailChange,
        email,
        selectedDate,
        handleFileInputChange,
        fileName,
        handleDelete,
        fileInputRef
    } = Blog()
    const isOnlyGeorgian = /^[ა-ჰ\s]+$/u.test(author);
    const isEmailValid = email.endsWith("@redberry.ge");
    const [isTyping, setIsTyping] = useState(false);
    const [isValid, setIsValid] = useState(true); // State to track overall validation

    useEffect(() => {
        setIsValid(
            authorValidation() === 'valid' &&
            titleValidation() === 'valid' &&
            descriptionValidation() === 'valid' &&
            fileValidation() === 'valid'
        );
    }, [author, title, description, fileName]);

    const handleTyping = () => {
        setIsTyping(true);
    };

    const handleBlur = () => {
        setIsTyping(false);
    };


    const handleClick = () => {
        if (isValid) {
            handlePublish();
        }
    };
    const authorValidation = () => {
        return (
            author.trim().length >= 4 &&
            isOnlyGeorgian
        ) ? 'valid' : 'invalid';
    };

    const titleValidation = () => {
        return title.trim().length >= 4 ? 'valid' : 'invalid';
    };

    const descriptionValidation = () => {
        return description.trim().length >= 4 ? 'valid' : 'invalid';
    };

    const fileValidation = () => {
        return fileName ? 'valid' : 'invalid';
    };
    const [isButtonClickable, setIsButtonClickable] = useState(false);

    useEffect(() => {
        setIsButtonClickable(
            fileName && isValid && selectedDate.trim() !== '' && categories.length > 0 && isEmailValid
        );
    }, [fileName, isValid, selectedDate, categories, isEmailValid]);

    return (
        <div>
            <header className="header">
                <div className='container d-flex justify-content-center'>
                    <div className="logo">
                        <img className='logo-img' src={process.env.PUBLIC_URL + '/LOGO-02 3.png'} alt="Logo"/>
                    </div>
                </div>
            </header>
            <div className="add_blog_container mt-5">
                <div className='add_blog_inside_container'>
                    <div className='mb-4'>
                        <div>
                            <h1>ბლოგის დამატება</h1>
                        </div>
                        <p>ატვირთეტ ფოტო</p>
                        {fileName ? (
                            <div className="file-input-container text-center border-0"
                                 onClick={() => fileInputRef.current.click()}>
                                <div className="file-name-container d-flex justify-content-between p-3 "
                                     style={{backgroundColor: '#F2F2FA'}}>
                                    <p className='my-auto'>
                                        <img className='me-2' src={process.env.PUBLIC_URL + '/gallery.png'} alt=""/>
                                        {fileName}
                                    </p>
                                    <button className="bg-transparent border-0" onClick={handleDelete}>
                                        X
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="file-input-container text-center"
                                 onClick={() => fileInputRef.current.click()}>
                                <label className='d-flex flex-column justify-content-center align-items-center'
                                       style={{backgroundColor: '#F2F2FA'}}>
                                    <img src={process.env.PUBLIC_URL + '/folder-add.png'} alt=""
                                         className="default-image"/>
                                    <p>ჩააგდეთ ფაილი აქ ან {<strong>აირჩიეთ ფაილი აქ</strong>}</p>
                                </label>
                            </div>
                        )}

                        <input className='upload_image' type="file" name='image' accept="image/*"
                               onChange={handleFileInputChange}
                               ref={fileInputRef} style={{display: 'none'}}/>
                    </div>
                    <div className="form-container">
                        <div className="form-field">
                            <div className="form-subfield">
                                <label className="form-label" htmlFor="author">ავტორი *</label>
                                <input
                                    className={`form-input ${isTyping ? 'typing' : ''} ${author.trim().length === 0 ? 'empty' : (author.replace(/\s/g, "").length < 4 ? 'invalid' : 'valid')}`}
                                    type="text"
                                    style={{width: '288px'}}
                                    name="author"
                                    value={author}
                                    onChange={handleAuthorChange}
                                    onFocus={handleTyping}
                                    onBlur={handleBlur}
                                />
                                <p className="form-message"
                                   style={{color: (author.trim().length === 0) ? 'grey' : (author.replace(/\s/g, "").length < 4 ? 'red' : 'green')}}>
                                    მინიმუმ ოთხი სიმბოლო
                                </p>
                                <p className="form-message"
                                   style={{color: author.trim().length === 0 ? 'grey' : author.trim().split(/\s+/).length > 1 ? 'green' : 'red'}}>
                                    მინიმუმ ორი სიტყვა
                                </p>
                                <p className="form-message"
                                   style={{color: (author.trim().length === 0) ? 'grey' : (isOnlyGeorgian ? 'green' : 'red')}}>
                                    მხოლოდ ქართული სიმბოლოები
                                </p>
                            </div>
                            <div className="form-subfield">
                                <label className="form-label" htmlFor="title">სათაური *</label>
                                <input
                                    className={`form-input ${isTyping ? 'typing' : ''} ${title.trim().length === 0 ? 'empty' : (title.replace(/\s/g, "").length < 4 ? 'invalid' : 'valid')}`}
                                    type="text"
                                    style={{width: '288px'}}
                                    name="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    onFocus={handleTyping}
                                    onBlur={handleBlur}
                                />
                                <p className="form-message"
                                   style={{color: (title.trim().length === 0) ? 'grey' : (title.replace(/\s/g, "").length < 4 ? 'red' : 'green')}}>
                                    მინიმუმ ოთხი სიმბოლო
                                </p>
                            </div>
                        </div>

                        <div className="">
                            <label className="form-label" htmlFor="description">აღწერა*</label>
                            <input
                                className={`form-input ${isTyping ? 'typing' : ''} ${description.trim().length === 0 ? 'empty' : (description.replace(/\s/g, "").length < 4 ? 'invalid' : 'valid')}`}
                                type="text"
                                style={{height: '124px'}}
                                name="description"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                            <p className="form-message"
                               style={{color: (isTyping || description.trim().length === 0) ? 'grey' : (description.replace(/\s/g, "").length < 4 ? 'red' : 'green')}}>
                                მინიმუმ ოთხი სიმბოლო
                            </p>
                        </div>

                        <div className="form-field">
                            <div className="form-subfield">
                                <label className="form-label" htmlFor="publishDate">გამოქვეყნების თარიღი*</label>
                                <input
                                    className={`form-date ${selectedDate.trim().length === 0 ? 'empty' : 'valid'}`}
                                    value={selectedDate}
                                    type="date"
                                    name="publish_date"
                                    id="publishDate"
                                    onChange={handleDateChange}
                                />
                            </div>
                            <div className="form-subfield">
                                <label className="form-label" htmlFor="categories">კატეგორიები*</label>
                                <select
                                    className="form-select"
                                    name="categories"
                                    id="categories"
                                    multiple
                                    onChange={handleSelectInputChange}
                                >
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-field">
                            <div className="form-subfield">
                                <label className="form-label" htmlFor="email">ელ-ფოსტა</label>
                                <input
                                    className={`form-input ${isTyping ? 'typing' : ''} ${email.trim().length === 0 ? 'empty' : (email.endsWith("@redberry.ge") ? 'valid' : 'invalid')}`}
                                    onChange={handleEmailChange}
                                    type="email"
                                    name="email"
                                />
                                {!isEmailValid && email.trim().length > 0 && (
                                    <p className="form-message error">
                                        <img src="" alt=""/>  ემაილი უნდა მთავრდებოდეს @redberry.ge - ით
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="form-field">
                            <button
                                className="form-button"
                                onClick={handleClick}
                                disabled={!isButtonClickable}
                                style={{backgroundColor: isButtonClickable ? '#800080' : 'grey'}}
                            >
                                გამოქქვეყნება
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;