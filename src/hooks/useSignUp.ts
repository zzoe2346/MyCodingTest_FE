import {useState} from "react";
import apiClient from "../api/apiClient.ts";
import {useNavigate} from "react-router-dom";

export interface SignupFormState {
    id: string;
    password: string;
    confirmPassword: string;
    email: string;
    verificationCode?: string; // 인증 코드 필드 추가
}

export const useSignup = () => {
    const [formState, setFormState] = useState<SignupFormState>({
        id: "",
        password: "",
        confirmPassword: "",
        email: "",
        verificationCode: "",
    });

    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isIdDuplicate, setIsIdDuplicate] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verificationCodeSent, setVerificationCodeSent] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 사용


    const handleInputChange = (
        field: keyof SignupFormState,
        value: string
    ) => {
        setFormState((prev) => ({...prev, [field]: value}));
        // 필드가 "verificationCode"일 경우 isEmailVerified를 false로 설정
        if (field === "verificationCode") {
            setIsEmailVerified(false);
        }
    };

    const handleSignup = async () => {
        //회원가입 로직
        try {
            const response = await apiClient.post("/sign-up", {
                username: formState.id,
                password: formState.password,
                email: formState.email,
            });
            console.log("회원가입 성공:", response.data);

            // 1.5초 후 팝업 닫고 페이지 이동
            setTimeout(() => {
                navigate("/login"); // 로그인 페이지로 리디렉션
            }, 1500);
        } catch (error) {
            console.error("회원가입 실패:", error);
            // 회원가입 실패 처리 (예: 에러 메시지 표시)
        }
    };

    const checkIdDuplicate = async (id: string): Promise<boolean> => {
        // ID 중복 확인 로직
        try {
            const response = await apiClient.post("auth/check-id", {id}); // 실제 요청 경로는 서버 API에 맞게 수정
            return response.data.isDuplicate;
        } catch (error) {
            console.error("ID 중복 확인 실패:", error);
            return false;
        }
    };

    const handleIdCheck = async () => {
        setLoading(true);
        const isDuplicate = await checkIdDuplicate(formState.id);
        setIsIdChecked(true);
        setIsIdDuplicate(isDuplicate);
        setLoading(false);
    };

    const handleEmailVerification = async () => {
        setLoading(true);
        try {
            // 서버에 이메일 인증 요청을 보내는 로직
            const response = await apiClient.post("/auth/send-verification-email", {
                email: formState.email,
            }); // 실제 요청 경로는 서버 API에 맞게 수정
            console.log("인증 이메일 전송:", response.data);
            setVerificationCodeSent(true);
        } catch (error) {
            console.error("인증 이메일 전송 실패:", error);
            // 에러 처리 (예: 에러 메시지 표시)
        } finally {
            setLoading(false);
        }
    };

    const handleVerificationCodeSubmit = async () => {
        setLoading(true);
        try {
            // 서버에 인증 코드 검증 요청을 보내는 로직
            const response = await apiClient.post("/auth/verify-code", {
                email: formState.email,
                code: formState.verificationCode,
            }); // 실제 요청 경로는 서버 API에 맞게 수정

            if (response.data.isVerified) {
                setIsEmailVerified(true);
                console.log("이메일 인증 성공");
            } else {
                setIsEmailVerified(false);
                console.log("이메일 인증 실패: ", response.data.message);
            }
        } catch (error) {
            console.error("이메일 인증 실패:", error);
            setIsEmailVerified(false);
            // 에러 처리 (예: 에러 메시지 표시)
        } finally {
            setLoading(false);
        }
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
        verificationCodeSent,
        handleInputChange,
        handleIdCheck,
        handleEmailVerification,
        handleVerificationCodeSubmit,
        isFormValid,
        handleSignup,
    };
};