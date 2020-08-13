import React, { Fragment, useState, useEffect } from 'react'
import $ from 'jquery'
import store from '../../../../redux/store'
// import 
export default function HomeOwnerListings() {
    const [url, setstate] = useState(null)
    useEffect(() => {
        let user_email = store.getState().user_obj.email
        let data = {user : {email :user_email}}
        console.log(url)
        $.when(url).then(
            () => {
                
                $.ajax({
                    type: "POST",
                    url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/getUserWholeProfile`,
                    data: data,
                    dataType: "JSON",
                    success: function (response) {
                        console.log('response.files_uploaded_name_array')
                        console.log(response.files_uploaded_name_array[0])
                        setstate(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/fetchVideo/${response.files_uploaded_name_array[0]}`)
                    }
                })
            }
        )
    }, [url])
    return (
        <Fragment>
            <div>
                <div>These are your posted videos:</div>
                <video key={url} controls autoPlay id="videoDisplay" style={{maxWidth : '85vw'}}>
                    <source src={url} type="video/mp4" />
                </video>
            </div>
        </Fragment>

    )
}
