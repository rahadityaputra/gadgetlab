const reviewValidation = async (schema, request) => {
    const result = await schema.validate(request, {
        abortEarly : false
    });
    if (result.error) {
        throw result.error;
    } else {
        return result.value;
    }    
}


export {
    reviewValidation
}