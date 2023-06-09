import TextField from '@material-ui/core/TextField';
import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@/components/ui/button';
import routes from '@/config/routes';
import { useRouter } from 'next/router';
import Avatar from '@/components/ui/avatar';

type ItemType = {
    userName: string;
    userAvarta?: string;
    userCover?: string;
};

type CardProps = {
    item: ItemType;
};

export default function UserForm({ item }: CardProps) {
    const router = useRouter();
    const { userName = '', userAvarta, userCover } = item;
    const [newUserName, setNewUserName] = useState(userName || '');
    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserName(e.target.value);
    };

    useEffect(() => {
        setNewUserName(userName);
    }, [userName]);

    const handleSaveUserName = async (e) => {
        try {
            e.preventDefault();
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            const decodedToken: any = jwt.decode(token);
            const userId = decodedToken?.idUser;
            await axios.put(
                `http://localhost:4003/users/update-name/${userId}`,
                { userName: newUserName },
                {
                    headers: {
                        token: `Bearer ${token}`,
                    },
                    method: 'PUT',
                }
            );
            router.push(routes.home);
            console.log('UserName updated successfully!');
        } catch (error) {
            console.error('Failed to update UserName:', error);
        }
    };

    return (
        <Card className="mt-10" style={{ width: '500px' }}>
            <CardHeader className="bg-gray-900 text-center text-white" title="Thông tin User" />
            <CardContent>
                <div className="mb-8 mt-10 h-full">
                    <div className="flex flex-row">
                        <div className="ml-16 flex flex-col items-center">
                            {userAvarta && <Avatar image={userAvarta} alt="userAvarta" className="mr-2 mt-4" size="lg" width={96} height={96} />}
                            <label>Ảnh đại diện</label>
                        </div>
                        <div className="ml-16 flex flex-col items-center">
                            {userCover && <Avatar image={userCover} alt="userCover" className="mr-2 mt-4" size="lg" width={96} height={96} />}
                            <label>Ảnh bìa</label>
                        </div>
                    </div>
                </div>
                <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                    <TextField
                        fullWidth
                        id="userName"
                        label="Tên người dùng"
                        placeholder="Tên người dùng"
                        margin="normal"
                        value={newUserName}
                        onChange={handleUserNameChange}
                    />
                    <Button onClick={handleSaveUserName}>Lưu Tên User</Button>
                </div>
            </CardContent>
        </Card>
    );
}
