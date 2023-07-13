import React from 'react';


type ButtonPropsType = {
    name: string
    callBack: () => void
    style?: {},
    className?: any

}


const Button = (props: ButtonPropsType) => {

    const onclickHandler = () => {
        props.callBack()
    }


    return (
        <div>
            <button className={props.className} onClick={onclickHandler}>{props.name}</button>
        </div>
    );
};

export default Button;