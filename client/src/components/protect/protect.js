import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Protect = () => {
    const navigate = useNavigate();


    const token = localStorage.getItem("token");


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
            document.location.reload();
        }
    }, []);
};

export default Protect;