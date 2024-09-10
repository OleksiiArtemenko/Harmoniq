import { Link } from "react-router-dom";
import instagramIcon from './icons/instagram.png'
import facebookIcon from './icons/facebook.png'
import twitterIcon from './icons/twitter.png'
import youtubeIcon from './icons/youtube.png'
import './Footer.scss'

export default function Footer () {

    const handleButtonClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <footer className='footer'>

            <div className='footer__share'>
                Well, did you like the website? Then share with your friends!
                <div className='footer__share--buttons'>
                    <button className='footer__share--buttons--size' onClick={() => handleButtonClick('https://facebook.com')}><img src={facebookIcon} alt='Facebook'/></button>
                    <button className='footer__share--buttons--size' onClick={() => handleButtonClick('https://x.com')}><img src={twitterIcon} alt='Twitter'/></button>
                    <button className='footer__share--buttons--size' onClick={() => handleButtonClick('https://instagram.com')}><img src={instagramIcon} alt='Instagram'/></button>
                    <button className='footer__share--buttons--size' onClick={() => handleButtonClick('https://youtube.com')}><img src={youtubeIcon} alt='YouTube'/></button>
                </div>
            </div>

            <div className="footer__info">
                AdvMusic LLC has entered into licensing agreements with the largest copyright holders for the use of
                musical works.&nbsp;
            </div>


            <div className="footer__content">

                <div className='footer__section footer__section--company'>
                    <ul>
                        <li>Copyright © 2024 Harmoniq.fm. All rights reserved.</li>
                        <li> <Link to="/cookie" className="footer__link"> Cookie Notice </Link> </li>
                        <li> <Link to="/terms_of_use" className="footer__link"> Terms of use </Link> </li>
                    </ul>
                </div>


                <div className='footer__section footer__section--contact'>

                    <ul>
                        <li>Contacts</li>
                        <li>TG: <a className="footer__link" onClick={() => handleButtonClick('https://t.me/notvalid')}>write to us</a></li>
                        <li>email: <a className="footer__link" href="mailto:artemenko.oleksii@icloud.com">artemenko.oleksii@icloud.com</a></li>
                    </ul>

                </div>

            </div>

        </footer>
    )
}