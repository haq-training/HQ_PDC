import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import jwt from 'jsonwebtoken';
import React, {useEffect, useState,useRef} from 'react';
import axios from 'axios';

type ItemType = {
    userCover: string;
};

type CardProps = {
    item: ItemType;
};

export default function ProfileRetroCover({ item }: CardProps){
    const { userCover } = item;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [userCoverCard, setUserCover] = useState(userCover);
    useEffect(() => {
        setUserCover(userCover );
    }, [userCover]);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setUserCover(URL.createObjectURL(file));
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            const formData = new FormData();
            const decodedToken = jwt.decode(token);
            const userId = decodedToken?.idUser;
            formData.append('userCover', file);
            axios.put(`http://localhost:4003/users/update-Cover/${userId}`, formData, {
                headers: {
                    token: `Bearer ${token}`
                },
                method: 'PUT'
            })
                .then(response => {
                    console.log('Upload success:', response.data);
                })
                .catch(error => {
                    console.error('Upload failed:', error);
                });
        }
    };

    const handleEditButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return(
        <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
            {userCoverCard && (
                <Image
                    src={userCoverCard}
                    placeholder="empty"
                    fill
                    className="object-cover"
                    alt="user1"
                />
            )}
            <Button
                className="mt-4" onClick={handleEditButtonClick}
            >
                <FontAwesomeIcon icon={faEdit} />
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
    )
}