import * as httpRequest from '~/utils/httpRequest';

export const image = async (formData) => {
    const res = await httpRequest.post('upload', formData,);
    return res;
};
