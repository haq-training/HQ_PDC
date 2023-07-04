import Avatar from '@/components/ui/avatar';
import Button from '@/components/ui/button';
import jwt from 'jsonwebtoken';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import React, {useRef} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) =>
    createStyles({
        imageButtons: {
            top: '10%',
            left: '50%',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            marginLeft: theme.spacing(34),
            marginTop: theme.spacing(1),
        })
);

type ItemType = {
    userAvarta: string;
};

type CardProps = {
    item: ItemType;
};

export default function ProfileRetroAvarta({ item }: CardProps){
    const { userAvarta } = item;
    const classes = useStyles();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            const formData = new FormData();
            const decodedToken = jwt.decode(token);
            const userId = decodedToken?.idUser;
            formData.append('userAvarta', file);
            axios.put(`http://localhost:4003/users/update-Avarta/${userId}`, formData, {
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
        <div className="flex items-center">
            {userAvarta && (
                <Avatar
                    image={userAvarta}
                    alt="Author"
                    className="mr-2 mt-4"
                    size="lg"
                    width={96}
                    height={96}
                />
            )}

            <Button className="ml-1 mt-10" onClick={handleEditButtonClick}>
                <FontAwesomeIcon icon={faEdit} />
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <Link href="/add-collection">
                <Button className={classes.imageButtons}>
                    Thêm Collection
                </Button>
            </Link>
        </div>
    )
}