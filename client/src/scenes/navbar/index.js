import React from 'react'
import { useState } from 'react';
import { Box,
  iconButton,
InputBase,
Typography,
Select,
MenuItem,
useMediaQuery, 
IconButton,
FormControl} from '@mui/material';
import { Search,
Message,
DarkMode,
LightMode,
Notifications,
Help,
Menu,
Close} from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { setLogout, setMode } from 'state';
import { useNavigate } from 'react-router-dom';
import FlexBeetween from 'components/FlexBetween';
import { useTheme } from '@emotion/react';
const Navbar = () => {
  const [isMobileMenuToogled,setIsMobileMenuToogled]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=> state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.neutral.background.default;
  const primaryLight = theme.palette.neutral.primary.light;
  const alt = theme.palette.neutral.background.alt;
  const fullName = `${user.firstName} ${user.lastName}` ;
  return (
    <FlexBeetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBeetween>
          <Typography fontWeight="bold"
          fontSize="clamp(1rem,2rem,3rem)"
          color="primary"
          onclick= {()=> navigate("/home")}
          sx={{
            "&:hover" : {
              color : primaryLight,
              cursor : "pointer",          
            },

          }}
          >
            MySocialMedia
          </Typography>
          {isNonMobileScreens && (
            <FlexBeetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem" >
              <InputBase placeholder='Search...'/>
              <IconButton> 
                <Search/>
              </IconButton>
              
            </FlexBeetween>
          )}
        </FlexBeetween>

       {/*  DESKTOP NAV */}
       { isNonMobileScreens ? (
          <FlexBeetween gap="2rem">
            <IconButton onclick={()=>dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode  sx={{fontSize: "25px"}}/>
                ) : (
                  <LightMode sx={{color:"dark" ,fontSize: "25px"}}/> 
                )}
            </IconButton>
            <Message  sx={{fontSize: "25px"}} />
            <Notifications  sx={{fontSize: "25px"}} />
            <Help  sx={{fontSize: "25px"}} />
            <FormControl  variant="standard" value={fullName} >
              <select value={fullName}  sx={{backgroundColor: neutralLight,
              width: "150px",
              borderRadius:"0.25rem",
              p: "0.25rem 1rem",
              "& .MuiSvgIcon-root" : {
                pr:"0.25rem",
                width:"3rem"
              },
              "& .MuiSelect-select:focus" :{
               backgroundColor : neutralLight
              }
              }}
              input={<InputBase/>}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                  <MenuItem onclick={()=> dispatch(setLogout())}>LOG OUT</MenuItem>
                </MenuItem>
              </select>
            </FormControl>
          </FlexBeetween>) 
       : (<IconButton onclick={()=> setIsMobileMenuToogled(!isMobileMenuToogled)}>

       </IconButton >
       )}
       {/* Mobile Nav */}
       2.41.33
    </FlexBeetween>
  )
}

export default Navbar