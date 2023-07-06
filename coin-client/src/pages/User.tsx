import React, { useState,useEffect} from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import RootLayout from '@/layouts/_root-layout';
import UserForm from '@/components/ui/UserForm';

function User() {
    const [dataUser , setDataUser] = useState([]);

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
        <RootLayout>
            <div className="flex flex-wrap w-400 mx-auto justify-center" noValidate autoComplete="off">
                <UserForm item={dataUser} />
            </div>
        </RootLayout>
);
}

export default User;
