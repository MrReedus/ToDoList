import React from 'react';


type ButtonPropsType = {
    name: string
    callBack:()=> void
    style?: {}
}




const Button = (props: ButtonPropsType) => {

    const onclickHandler = ()=> {
        props.callBack()
    }


    return (
        <div>
            <button onClick={onclickHandler}>{props.name}</button>
        </div>
    );
};

export default Button;