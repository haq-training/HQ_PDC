import React, { useState,useEffect} from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import EditUserForm from '@/components/ui/editUserForm';

function EditUser() {
    const [dataUser , setDataUser] = useState([]);
    const data = React.useMemo(() => dataUser, [dataUser]);
    console.log('data',data)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
                if (token) {
                    const decodedToken = jwt.decode(token);
                    const userId = decodedToken.idUser;
                    const response = await axios.get(`http://localhost:4003/users/${userId}`, {
                        headers: {
                            token: `Bearer ${token}`
                        },
                        method: 'GET'
                    });
                    const user = await response.data;
                    if (user) {
                        setDataUser(user);
                    }
                    return user;
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().catch((e) => {
            console.error('Loi: ', e);
        });
    }, []);

    return (
        <div className="flex flex-wrap w-400 mx-auto justify-center" noValidate autoComplete="off">
            <EditUserForm item={data} />
        </div>
    );
}

export default EditUser;
