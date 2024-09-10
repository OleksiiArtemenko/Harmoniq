import './CookieInfoPage.scss'
import {useEffect} from "react";

const CookieInfoPage = () => {

    useEffect(() => {
        document.title = 'Cookie Notice';
    }, []);

    return (
        <div className="CookieInfoPage">
            <div className="CookieInfoPage-text1">
                Website's use of cookies
            </div>
            <div className="CookieInfoPage-text2">
                Cookies may be used on the website Harmoniq.fm. Cookies allow you to take full advantage of the site's features, such as identifying you and remembering your preferences.
                <br /><br />
                If you want to disable cookies in the Safari web browser, go to "Settings" and select the cookie blocking option in the "Privacy" panel. Open "Settings" on your iPad, iPhone, or iPod touch, then select "Safari" and go to the cookie settings section. If you are using another web browser, contact your provider to learn how to disable cookies.
                <br /><br />
                Cookies are used on our websites. Disabling them may result in losing access to some sections of the site.
                <br /><br />
                The cookies used on our websites are categorized according to the guidelines provided in the ICC UK Cookie Guide.
            </div>
        </div>
    );
}

export default CookieInfoPage