import React, { useEffect, useState } from "react";
import {
  SocialIcon
} from "react-social-icons";

const ShareModal = ({setModal}) => {

  const copyToClipboard = (text) => {
    console.log('text', text)
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  };

  const [clipboardText, setClipboardText] = useState("");

  useEffect(() => {
    if(clipboardText.length){
      copyToClipboard(clipboardText);
    }
  }, [clipboardText]);


  return (
    <div className="share-modal">
      <article>
        <div className="share-wrapper">
          <div className="share-modal-first-column d-flex justify-content-between pb-3">
            <div className="d-flex justify-content-center align-items-center">
              <span className="share-modal-title">SHOPIFY</span>
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{backgroundColor:"#f5f5f7", width:"40px", height:"40px", borderRadius:"50%"}}>
              <i className="fa-solid fa-xmark" style={{color:"#777777"}} onClick={()=> setModal(false)}></i>
            </div>
          </div>
          <div className="share-modal-second-column pt-4">
            <div>
              <p>Share this link via</p>
            </div>
            <div className="share-icons d-flex justify-content-between">
              <SocialIcon url="https://instagram.com"/>
              <SocialIcon url="https://facebook.com"/>
              <SocialIcon url="https://twitter.com"/>
              <SocialIcon url="https://whatsapp.com"/>
              <SocialIcon url="https://telegram.com"/>
            </div>
            <div className="pt-5">
              <p>Or copy link</p>
            </div>
            <div className="share-modal-share-link d-flex align-items-center justify-content-center">
              <div className="me-2 px-1">
                <i className="fa-solid fa-link" style={{color: clipboardText.length ? "palevioletred" : "#4b4a4a", cursor:"default"}}></i>
              </div>

              <input type="text" readonly value={window.location.href} style={{width:"80%", color:"#777777"}}/>
              <div className="ps-1"> 
                <button className="py-1 px-2" onClick={()=> setClipboardText(window.location.href)}>Copy</button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ShareModal;
