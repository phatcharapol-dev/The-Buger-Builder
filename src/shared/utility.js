export const updateObject = (oldObject,updateProperties) => {
    return {
        ...oldObject,
        ...updateProperties
    };
}

export const checkValidate = (value,rule) => {
    let isValid = true ;
    if(rule.required){
        isValid = value.trim() !== '' && isValid ;
    }
    if(rule.minLength){
        isValid = value.length >= rule.minLength && isValid;
    }
    if(rule.maxLength){
        isValid = value.length <= rule.maxLength && isValid ;
    }
    if(rule.isEmail){
        const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        isValid = pattern.test(value) && isValid ;
    }
    if(rule.isNumeric){
        const reg = /^\d+$/;
        isValid = reg.test(value) && isValid;
    }
    return isValid ;
}