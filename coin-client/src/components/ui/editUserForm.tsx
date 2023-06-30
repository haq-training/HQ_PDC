import React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';

type ItemType = {
    userName: string;
    userAvarta: string;
    userCover: string;
};

type CardProps = {
    item: ItemType;
};

export default function EditUserForm({  item}: CardProps) {
    const {  userName = '', userAvarta, userCover } = item ?? [];

    console.log('item',item)
    console.log('userAvatar',item.userAvarta)
    console.log('userCover',item.userCover)

    // const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     dispatch({
    //         type: 'setUserName',
    //         payload: event.target.value,
    //     });
    // };

    // const handleUserAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setUserAvatar(event.target.value);
    // };
    //
    // const handleUserCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setUserCover(event.target.value);
    // };
    //

    const handleUpdate = async () => {
        // Perform validation and update logic here
    };

    return (
            <Card className="mt-10" style={{ width: '500px' }}>
                <CardHeader className="text-center bg-gray-900 text-white" title="Sửa thông tin User" />
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

                                <label>Ảnh đại bìa</label>
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
                            value={userName}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        size="large"
                        className="flex-grow"
                        onClick={handleUpdate}
                    >
                        Lưu
                    </Button>
                </CardActions>
            </Card>
    );
}
