import { useState } from "react";
import {
    Box,
    Typography,
    useTheme,
    useMediaQuery,
    Button,
    TextField
} from "@mui/material";
// import { EditOutlinedIcon } from "@mui/icons-material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from "formik";
import * as yup from "yup"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBeetween from "components/FlexBetween";
import { colorTokens, themeSettings } from '../../theme';


const registerSchema = yup.object().shape({
    firstName:yup.string().required("required"),
    lastName:yup.string().required("required"),
    email:yup.string().email("invalide emailll").required("required"),
    password:yup.string().required("required"),
    location:yup.string().required("required"),
    occupation:yup.string().required("required"),
    picture:yup.string().required("required"),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("invalide emailll").required("required"),
    password:yup.string().required("required"),

})
const initialValuesRegister = {
    firstName:"",
    lastName:"",
    email: "",
    password:"",
    location:"",
    occupation:"",
    picture:"",
};
const initialValuesLogin = {
    email: "",
    password:"",
    
  
};
const Form = ()=> {
    const [pageType, setPageType]= useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType ==="login";
    const isRegister = pageType ==="register";
    const navigate = useNavigate();
    const themeSetting = themeSettings();
    // REGISTERRR
    const register = async (values, onSubmitProp)=> {
        // this allows us to send form info with image 
        console.log("Register function called", values);
        const formData = new FormData();
        for(let value in values  ){
            formData.append(value, values[value])
        }
        formData.append('picturePath', values.picture.name);
        console.log(formData);
        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProp.resetForm();
        if (savedUser) {
            setPageType("login");
        }
    };
      // LOGIN
      const login = async (values, onSubmitProp)=> {
        console.log("Login function called");
        const LoggedInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await LoggedInResponse.json();
        onSubmitProp.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
        }

      }
    const handleFormSubmit = async (values, onSubmitProp) => {
        if(isLogin) await login(values, onSubmitProp);
        if(!isLogin) await register(values, onSubmitProp);
    };
    return (
        <Formik onSubmit={handleFormSubmit}
        initialValues = {isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema= {isLogin ? loginSchema : registerSchema}
        >
        {({ 
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,


        })=>{
            // console.log("Formik onSubmit prop:", handleSubmit);
            return (
            <form onSubmit={handleSubmit}>
                <Box 
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},

                }}
                >
                    {isRegister && (
                        <>
                        <TextField label="First Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        sx={{ gridColumn: "span 2"}}
                        />
                        <TextField label="Last Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        sx={{ gridColumn: "span 2"}}
                        />
                         <TextField label="Location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.location}
                        name="Location"
                        error={Boolean(touched.location) && Boolean(errors.location)}
                        helperText={touched.location && errors.location}
                        sx={{ gridColumn: "span 4"}}
                        />
                        <TextField label="Occupation"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.occupation}
                        name="Occupation"
                        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                        helperText={touched.occupation && errors.occupation}
                        sx={{ gridColumn: "span 4"}}
                        />
                        <Box 
                        gridColumn="span 4"
                        border={`1px solid ${themeSetting.palette.neutral.medium}` }
                        borderRadius="5px"
                        p="1rem"
                        >
                        <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles)=>
                        setFieldValue("picture", acceptedFiles[0])}
                        >
                            {({ getRootProps, getInputProps})=>(
                                <Box
                                {...getRootProps()}
                                border={`2px dashed ${themeSetting.palette.primary.main}`}
                                p="1rem"
                                sx = {{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!values.picture ? (
                                        <p>
                                          Add Picture Here  
                                        </p>
                                    ): (
                                        <FlexBeetween>
                                            <Typography>{values.picture.name}</Typography>
                                            <EditOutlinedIcon />
                                        </FlexBeetween>
                                    )}

                                </Box>
                            )}
                        </Dropzone>

                        </Box>
                        </>
                    )}
                     <TextField label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn: "span 4"}}
                        />
                          <TextField label="Password"
                          type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        sx={{ gridColumn: "span 4"}}
                        />
                </Box>
                {/* BUTTONS */}
                <Box>
                    <Button fullWidth
                    type="submit"
                    sx={{
                        m: "2rem 0",
                        p: "1rem",
                        backgroundColor: themeSetting.palette.primary.main,
                        color: themeSetting.palette.background.alt,
                        "&:hover": { color: themeSetting.palette.primary.main },
                        }}
                    >
                        {isLogin ? "LOGIN": "REGISTER"}
                    </Button>
                    <Typography 
                    onClick={()=> {
                        setPageType(isLogin? "register" : "login");
                        resetForm();
                    }}
                    sx={{
                        textDecoration: "underline",
                        color:palette.primary.main,
                        "&:hover":{
                            cursor: "pointer",
                            color: palette.primary.light,
                        },
                    }}
                    >
                            { isLogin ? "dont have an account ? sign up here."
                            : "already have an account? login here" }
                    </Typography>

                </Box>

            </form>3.30
        )}}

        </Formik>
    )
}
export default Form; 