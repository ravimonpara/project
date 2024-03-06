import VerifyLogin from "./VerifyLogin";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
export default function AdminLogout()
{
    VerifyLogin();
    let navigator = useNavigate();
    let [cookies, setCookie, removeCookie] = useCookies(['theeasylearn']);
    removeCookie('id'); //cookies remove from client
    navigator("/"); //redirect user on login screen
    return (<></>);
}