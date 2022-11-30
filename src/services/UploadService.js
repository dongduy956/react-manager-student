import * as httpRequestPublic from '~/utils/httpRequestPublic';

export const image = async (formData) => {
    const res = await httpRequestPublic.post('upload', formData);
    return res;
};
