import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { LogOut , Settings , User , HelpCircle } from "lucide-react";
import { logout } from "@/features/auth/authSlice";
import { Button } from "../button/button";
import{ MenuItem , ListItemText, ListItemIcon, MenuList, Divider }from "@mui/material";
import profile from "../../assets/auth.jpg";



export default function ProfileMenu() {

    const [isOpen , setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
   


    const handleLogout = () => {

        dispatch(logout())
        navigate("/")
    }

    return (

        <div className="relative">

            {/* profile icon */}
            <Button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 p-2 rounded-full bg-stone-50 hover:bg-gray-100 transition">
                 <img src={profile} alt="profile" className="w-10 h-10 rounded-full border"/>
            </Button>

            {/* Dropdown Menu */}
            {
                isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                        <MenuList>
                            <MenuItem>
                            <ListItemIcon>
                                <User size={18}/>
                            </ListItemIcon>
                            <ListItemText> Profile </ListItemText>
                            </MenuItem>

                            <MenuItem>
                            <ListItemIcon>
                                <Settings size={18}/>
                            </ListItemIcon>
                            <ListItemText> Settings  </ListItemText>
                            </MenuItem>

                            <MenuItem>
                            <ListItemIcon>
                                <HelpCircle size={18}/>
                            </ListItemIcon>
                            <ListItemText> Help  </ListItemText>
                            </MenuItem>

                            <Divider/>

                            <MenuItem>
                            <ListItemIcon>
                                <LogOut size={18}/>
                            </ListItemIcon>
                            <ListItemText onClick={handleLogout}> Logout </ListItemText>
                            </MenuItem>
                        </MenuList>
                        

                    </div>
                )
            }
        </div>
    )
}