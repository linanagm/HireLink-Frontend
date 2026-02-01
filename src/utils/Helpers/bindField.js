async function validateField(schema, values, field, setErrors) {
    try {
        await schema.validateAt(field, values);
        setErrors((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
        return true;
    } catch (err) {
        setErrors((prev) => ({ ...prev, [field]: err.message }));
        return false;
    }
}
export const bindField = ({
    name,
    values,
    setValues,
    touched,
    setTouched,
    errors,
    setErrors,
    schema,
    submitAttempted,
}) => {
    const showError = Boolean((touched[name] || submitAttempted) && errors[name]);

    return {
        value: values[name] ?? "",
        onChange: (v) => {
            setValues((p) => ({ ...p, [name]: v }));

            // validate أثناء الكتابة لو بدأنا نعرض errors
            if (submitAttempted || touched[name]) {
                validateField(
                    schema,
                    { ...values, [name]: v },
                    name,
                    setErrors
                );
            }
        },
        onBlur: () => {
            setTouched((t) => ({ ...t, [name]: true }));
            validateField(schema, values, name, setErrors);
        },
        error: showError ? errors[name] : "",
        showError,
    };
};
