import {Box, Button, CircularProgress, Divider, Grid2, Paper, TextField, Typography,} from "@mui/material";
import {useSignup} from "../../hooks/useSignUp.ts";

const SignupForm = () => {
    const {
        formState,
        isIdChecked,
        isIdDuplicate,
        isEmailVerified,
        loading,
        handleInputChange,
        handleIdCheck,
        handleEmailVerification,
        handleVerificationCodeSubmit, // 인증 코드 제출 핸들러 추가
        verificationCodeSent,
        isFormValid,
        handleSignup
    } = useSignup();

    return (
        <Box sx={{mt: 1, width: "500px"}}>
            <Paper sx={{width: "100%", padding: 3}}>
                <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                        <Typography variant="h4" mb={2}>
                            회원가입
                        </Typography>
                    </Grid2>
                    <Grid2 size={12}>
                        <Typography variant="body1" mb={0}>
                            아이디
                        </Typography>
                    </Grid2>

                    <Grid2 size={10}>
                        <TextField
                            label="아이디"
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            value={formState.id}
                            onChange={(e) => handleInputChange("id", e.target.value)}
                            error={isIdChecked && isIdDuplicate}
                        />
                    </Grid2>
                    <Grid2 size={2}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleIdCheck}
                            disabled={!formState.id || loading}
                            sx={{height: "100%"}}
                        >
                            {loading ? <CircularProgress size={20}/> : "확인"}
                        </Button>
                    </Grid2>
                    <Grid2 size={12}>
                        <Typography variant={"caption"}>
                            {
                                isIdChecked ? (isIdDuplicate ? "이미 사용 중인 아이디입니다." : "사용가능한 아이디입니다.") : "아이디 중복 확인을 해주세요."
                            }
                        </Typography>
                    </Grid2>


                    {/*비밀번호 파트*/}
                    <Grid2 size={12}>
                        <Divider/>
                    </Grid2>
                    <Grid2 size={12}>
                        <Typography variant="body1" mb={0}>
                            비밀번호
                        </Typography>
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            label="비밀번호"
                            variant="outlined"
                            type="password"
                            fullWidth
                            autoComplete="off"
                            value={formState.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            label="비밀번호 확인"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={formState.confirmPassword}
                            onChange={(e) =>
                                handleInputChange("confirmPassword", e.target.value)
                            }
                            error={
                                formState.confirmPassword !== "" &&
                                formState.password !== formState.confirmPassword
                            }
                            helperText={
                                formState.confirmPassword !== "" &&
                                formState.password !== formState.confirmPassword
                                    ? "비밀번호가 일치하지 않습니다."
                                    : ""
                            }
                        />
                    </Grid2>

                    <Grid2 size={12}>
                        <Divider/>
                    </Grid2>
                    <Grid2 size={12}>
                        <Typography variant="body1" mb={0}>
                            이메일 인증
                        </Typography>
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            label="이메일"
                            variant="outlined"
                            fullWidth
                            value={formState.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            sx={{mb: 2}} // Add margin bottom
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleEmailVerification}
                            disabled={!formState.email || loading || isEmailVerified}
                            sx={{mb: 2}} // Add margin bottom
                        >
                            {loading ? <CircularProgress size={20}/> : "인증 요청"}
                        </Button>
                    </Grid2>

                    {/* 인증 코드 입력 필드 (이메일 인증 요청 후에만 표시) */}
                    {verificationCodeSent && (
                        <>
                            <Grid2 size={12}>
                                <TextField
                                    label="인증 코드"
                                    variant="outlined"
                                    fullWidth
                                    value={formState.verificationCode}
                                    onChange={(e) =>
                                        handleInputChange("verificationCode", e.target.value)
                                    }
                                    sx={{mb: 2}} // Add margin bottom
                                />
                            </Grid2>
                            <Grid2 size={12}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleVerificationCodeSubmit}
                                    disabled={loading || isEmailVerified}
                                >
                                    {loading ? <CircularProgress size={20}/> : "인증 확인"}
                                </Button>
                            </Grid2>
                        </>
                    )}

                    <Grid2 size={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!isFormValid()}
                            onClick={(e) => {
                                e.preventDefault(); // 이벤트 전파 방지
                                handleSignup(); // useSignup 훅의 handleSignup 함수 호출
                            }}
                        >
                            회원가입
                        </Button>
                    </Grid2>
                </Grid2>
            </Paper>
        </Box>
    );
};

export default SignupForm;