import {useState} from "react";

export interface SignupFormState {
    id: string;
    password: string;
    confirmPassword: string;
    email: string;
}

export const useSignup = () => {
    const [formState, setFormState] = useState<SignupFormState>({
        id: "",
        password: "",
        confirmPassword: "",
        email: "",
    });

    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isIdDuplicate, setIsIdDuplicate] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (
        field: keyof SignupFormState,
        value: string
    ) => {
        setFormState((prev) => ({...prev, [field]: value}));
    };

    const handleSignup = () => {
        console.log("회원가입 데이터:", {
            id: formState.id,
            password: formState.password,
            email: formState.email,
        });
    };

    const checkIdDuplicate = async (id: string): Promise<void> => {
        setLoading(true);
        const isDuplicate = id === "existingId"; // 예제 로직
        setIsIdChecked(true);
        setIsIdDuplicate(isDuplicate);
        setLoading(false);
    };


    const sendEmailVerification = async (): Promise<void> => {
        setLoading(true);
        const verified = true; // 예제 로직
        //이메일 변수 없엤음
        setIsEmailVerified(verified);
        setLoading(false);
    };


    const handleIdCheck = async () => {
        setLoading(true);
        const isDuplicate = await checkIdDuplicate(formState.id);
        setIsIdChecked(true);
        // @ts-expect-error
        setIsIdDuplicate(isDuplicate);
        setLoading(false);
    };

    const handleEmailVerification = async () => {
        setLoading(true);
        // @ts-expect-error
        const verified = await sendEmailVerification(formState.email);
        // @ts-expect-error
        setIsEmailVerified(verified);
        setLoading(false);
    };

    const isFormValid = () =>
        formState.id &&
        !isIdDuplicate &&
        isIdChecked &&
        formState.password &&
        formState.password === formState.confirmPassword &&
        formState.email &&
        isEmailVerified;

    return {
        formState,
        isIdChecked,
        isIdDuplicate,
        isEmailVerified,
        loading,
        handleInputChange,
        handleIdCheck,
        handleEmailVerification,
        isFormValid,
        handleSignup,
    };
};
