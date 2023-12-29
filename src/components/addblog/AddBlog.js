    import Blog from "../Blog";
    import './AddBlog.css';
    import {useState, useEffect} from "react";
    import Select from "react-select";

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
            post,
            handleFileInputChange,
            fileName,
            handleDelete,
            fileInputRef,
            isTyping,
            handleBlur,
            handleTyping,
            homeClick,
            popup,
            closePopupClick,
            clearStorage
        } = Blog()
        const isOnlyGeorgian = /^[ა-ჰ\s]+$/u.test(author);
        const isEmailValid = email.endsWith("@redberry.ge");
        const [isValid, setIsValid] = useState(true);

        useEffect(() => {
            setIsValid(
                authorValidation() === 'valid' &&
                titleValidation() === 'valid' &&
                descriptionValidation() === 'valid' &&
                fileValidation() === 'valid'
            )
        }, [author, title, description, fileName]);

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
                {popup ? <div>
                    <div className='overlay'></div>
                    <div className='popup_Window position-fixed container px-4'>
                        <header className='d-flex justify-content-end'>
                            <button className='x_button border-0 mt-3 bg-transparent' onClick={closePopupClick}><img src={process.env.PUBLIC_URL + '/add.png'}
                                                                                                                     alt=""/></button>
                        </header>
                        <img className='mb-2' src={process.env.PUBLIC_URL + '/tick-circle.png'} alt=""/>
                        <div>
                            <h3 className='login_title mb-5'>ჩანაწი წარმატებით დაემატა</h3>
                        </div>

                        <div>
                            <button className='popup_login border-0' onClick={clearStorage}>მთავარ გვერდზე დაბრუნება</button>
                        </div>
                    </div>
                </div> : null}
                <header className="header py-3">
                    <div className='container d-flex justify-content-center'>
                        <div className="logo">
                            <img style={{borderRadius: '0'}} className='logo-img' src={process.env.PUBLIC_URL + '/LOGO-02 3.png'} alt="Logo"/>
                        </div>
                    </div>
                </header>
                <div style={{zIndex: '0',}} className='mt-3'>
                    <button style={{position: 'absolute', marginLeft: '200px'}} onClick={clearStorage}
                            className='border-0 bg-transparent'><img
                        className=''
                        src={process.env.PUBLIC_URL + '/Arrow.png'}
                        alt=""/></button>
                </div>
                <div className="add_blog_container my-4">
                    <div className='add_blog_inside_container'>
                        <div className='form_title'>
                            <h3>ბლოგის დამატება</h3>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="">
                                ატვირთეთ ფოტო
                                <input className='upload_image' type="file" name='image' accept="image/*"
                                       onChange={handleFileInputChange}
                                       ref={fileInputRef} style={{display: 'none'}}/>
                            </label>
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
                        </div>
                        <div className="form-container">
                            <div className="form-field">
                                <div className="form-subfield">
                                    <label className="form-label" htmlFor="author">ავტორი *</label>
                                    <input
                                        className={`form-input ${isTyping ? 'typing' : ''} ${author.trim().length === 0 ? 'empty' : (author.replace(/\s/g, "").length < 4 || author.trim().split(/\s+/).length < 2  || !isOnlyGeorgian ? 'invalid' : 'valid')}`}
                                        type="text"
                                        style={{width: '288px'}}
                                        name="author"
                                        value={author}
                                        placeholder='შეიყვანეთ ავტორი'
                                        onChange={handleAuthorChange}
                                        onFocus={handleTyping}
                                        onBlur={handleBlur}
                                    />
                                    <p className="form-message"
                                       style={{color: (author.trim().length === 0) ? 'grey' : (author.replace(/\s/g, "").length < 4 ? 'red' : 'green')}}>
                                        მინიმუმ ოთხი სიმბოლო
                                    </p>
                                    <p className="form-message"
                                       style={{color: (author.trim().length === 0) ? 'grey' : author.trim().split(/\s+/).length > 1 ? 'green' : 'red'}}>
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
                                        placeholder='შეიყვანეთ სათაური'
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
                                <label className="form-label" htmlFor="description">
                                    აღწერა*
                                </label>
                                <textarea
                                    className={`form-input ${isTyping ? 'typing' : ''} ${description.trim().length === 0 ? 'empty' : (description.replace(/\s/g, "").length < 4 ? 'invalid' : 'valid')}`}
                                    style={{height: '124px', width: '100%', resize: 'none', marginTop: '8px'}}
                                    name="description"
                                    value={description}
                                    placeholder='შეიყვანეთ აღწერა'
                                    onChange={handleDescriptionChange}
                                    onFocus={handleTyping}
                                    onBlur={handleBlur}
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
                                        className={`form-date ${selectedDate?.trim().length === 0 ? 'empty' : 'valid'}`}
                                        value={selectedDate}
                                        type="date"
                                        name="publish_date"
                                        id="publishDate"
                                        onChange={handleDateChange}

                                    />
                                </div>
                                <div className="form-subfield">
                                    <label className="form-label" htmlFor="categories">კატეგორიები*</label>
                                    <Select isMulti={true}
                                            onChange={handleSelectInputChange}
                                            onMenuOpen={() => {}}
                                            onMenuClose={() => {}}
                                            options={categories}
                                            getOptionValue={o => o.id}
                                            getOptionLabel={o => o.title}
                                            id="select"
                                            value={post.categories}
                                            styles={{
                                                control: (styles) => ({ ...styles, borderRadius: '12px', width: '288px' }),
                                                multiValue: (styles, { data }) => {
                                                    return {
                                                        ...styles,
                                                        backgroundColor: data.background_color,
                                                        color: data.text_color,
                                                        borderRadius: '30px',

                                                        fontSize: '12px',
                                                    fontWeight: '500',
                                                    lineHeight: '16px',
                                                    };
                                                },
                                                multiValueLabel: (styles, { data }) => ({
                                                    ...styles,
                                                    backgroundColor: data.background_color,
                                                    color: data.text_color,
                                                    borderRadius: '30px'
                                                })
                                            }}
                                    />
                                </div>
                            </div>

                            <div className="form-field">
                                <div className="form-subfield">
                                    <label className="form-label" htmlFor="email">ელ-ფოსტა</label>
                                    <input
                                        className={`form-input ${isTyping ? 'typing' : ''} ${email.trim().length === 0 ? 'empty' : (email.endsWith("@redberry.ge") ? 'valid' : 'invalid')}`}
                                        onChange={handleEmailChange}
                                        value={email}
                                        type="email"
                                        name="email"
                                        placeholder='example@redberry.ge'
                                        onFocus={handleTyping}
                                        onBlur={handleBlur}
                                    />
                                    {!isEmailValid && email.trim().length > 0 && (
                                        <p style={{color: 'red', fontWeight: '500'}} className="form-message error">
                                            <img src={process.env.PUBLIC_URL + '/info-circle.png'} alt=""/> ემაილი უნდა
                                            მთავრდებოდეს @redberry.ge - ით
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="form-button-field">
                                <button
                                    className="form-button"
                                    onClick={handleClick}
                                    disabled={!isButtonClickable}
                                    style={{backgroundColor: isButtonClickable ? '#5D37F3' : '#E4E3EB'}}
                                >
                                    გამოქვეყნება
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default AddBlog;