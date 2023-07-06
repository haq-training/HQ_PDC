import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@/components/ui/button';
import routes from '@/config/routes';

type ItemType = {
    idCollection: string | number;
    idUser: string | number;
    nameCollection: string;
    slug: string;
    title: string;
    coverImage: string;
    numberOfArtwork: number;
    image: string;
    avatar: string;
    userName: string;
    userSlug: string;
};

type CardProps = {
    item: ItemType;
    idUser: number;
    idCollection: number;
};

export default function EditCollectionForm ({ item,idCollection,idUser}: CardProps) {

    const router = useRouter();
    console.log(item)

    console.log(item[0]?.nameCollection || '')
    console.log(item[0]?.title || '')

    const [nameCollectionCard, setNameCollection] = useState(item[0]?.nameCollection || '' );
    const [titleCard, setTitle] = useState(item[0]?.title || '');
    console.log('nameCollectionCard',nameCollectionCard)
    console.log('titleCard',titleCard)


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameCollection(event.target.value);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleCollectionUpdate = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.put(
                `http://localhost:4003/collections/update-information/${idUser}/${idCollection}`,
                { nameCollection: nameCollectionCard, title: titleCard },
                {
                    headers: {
                        token: `Bearer ${
                            typeof window !== 'undefined' ? localStorage.getItem('token') : null
                        }`,
                    },
                }
            );
            console.log(response);
            router.push(routes.profile);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <form className="flex flex-wrap w-400 mx-auto justify-center" noValidate autoComplete="off">
            <Card className="mt-10">
                <CardHeader className="text-center bg-gray-900 text-white" title="Edit Collection" />
                <CardContent>
                    <div>
                        <TextField
                            fullWidth
                            id="nameCollection"
                            label="Tên Collection"
                            placeholder="Tên Collection"
                            margin="normal"
                            value={nameCollectionCard}
                            onChange={handleNameChange}
                        />
                        <TextField
                            fullWidth
                            id="title"
                            label="Tên title"
                            placeholder="Tên title"
                            margin="normal"
                            value={titleCard}
                            onChange={handleTitleChange}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        size="large"
                        className="flex-grow"
                        onClick={handleCollectionUpdate}
                    >
                        Lưu
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};
