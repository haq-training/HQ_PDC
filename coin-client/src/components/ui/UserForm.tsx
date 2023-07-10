import TextField from '@material-ui/core/TextField';
import React, { useState,useEffect } from 'react';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import routes from '@/config/routes';
import {useRouter} from 'next/router';

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
                        token: `Bearer ${token}`
                    },
                    method: 'PUT'
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
            <CardHeader className="text-center bg-gray-900 text-white" title="Thông tin User" />
            <CardContent>
                <div className="mb-8 h-full mt-10">
                    <div className="flex flex-row">
                        <div className="flex flex-col items-center ml-16">
                            {userAvarta && (
                                <Image
                                    src={userAvarta}
                                    placeholder="empty"
                                    width={60}
                                    priority
                                    quality={100}
                                    height={60}
                                    alt={userName}
                                />
                            )}
                            <label>Ảnh đại diện</label>
                        </div>
                        <div className="flex flex-col items-center ml-16">
                            {userCover && (
                                <Image
                                    src={userCover}
                                    placeholder="empty"
                                    width={60}
                                    priority
                                    quality={100}
                                    height={60}
                                    alt={userName}
                                />
                            )}
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
                    <Button onClick={handleSaveUserName}>Lưu</Button>
                </div>
            </CardContent>
        </Card>
    );
}
