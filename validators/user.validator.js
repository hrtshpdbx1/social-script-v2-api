const yup = require('yup');

const updateMeSchema = yup.object({
    characterAvatarSeed: yup
        .string()
        .trim()
        .min(1, 'Le seed est trop court')
        .max(50, 'Le seed est trop long')
        .required('Le seed est obligatoire')
});

module.exports = { updateMeSchema };