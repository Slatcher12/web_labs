import React from 'react';
import './PopUp.css';
import close from "../../../assets/close.svg";

const PopUp = (
    {headText, active, setActive, children}
) => {
    return (
        <div className={`popup-modal ${active&&'active'}`} onClick={() => setActive(false)}>
            <div className={`popup-modal-content ${active&&'active'}`} onClick={e => e.stopPropagation()}>
                <div>
                    <div className='popup-head'>
                        <div>
                            <h3>{headText}</h3>
                        </div>
                        <img src={close} alt={'close'} onClick={() => setActive(false)}/>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PopUp;