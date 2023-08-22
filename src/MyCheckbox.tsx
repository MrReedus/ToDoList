import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";

type CheckBoxPropsType = {
    checked: boolean
    callBack:(newIsDoneValue: boolean)=>void
}

const MyCheckbox = (props:CheckBoxPropsType) => {

    return (

            <Checkbox
                color="primary"
                onChange={(e) => props.callBack(e.currentTarget.checked)}
                checked={props.checked}/>

    );
};

export default MyCheckbox;