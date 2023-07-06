import React, { useState, useEffect, useReducer, useRef } from 'react';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import axios from 'axios';
import RootLayout from '@/layouts/_root-layout';
import { toast } from 'react-toastify';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@/components/ui/button';
import {useRouter} from 'next/router';
import routes from '@/config/routes';
type State = {
    nameCollection: string;
    title: string;
    image: string;
    coverImage: string[];
    helperText: string;
    isError: boolean;
};
const initialState: State = {
    nameCollection: "",
    title: "",
    image: "",
    coverImage : [],
    helperText: '',
    isError: false,
};
type Action =
    | { type: 'setNameCollection'; payload: string }
    | { type: 'setTitle'; payload: string }
    | { type: 'setImage'; payload: string }
    | { type: 'setError'; payload: string }
    | { type: 'setCoverImage'; payload: string[] }

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setNameCollection':
            return {
                ...state,
                nameCollection: action.payload,
            };
        case 'setTitle':
            return {
                ...state,
                title: action.payload,
            };
        case 'setImage':
            return {
                ...state,
                image: action.payload,
            };
        case 'setCoverImage':
            return {
                ...state,
                coverImage: action.payload,
            };
        case 'setError':
            return {
                ...state,
                helperText: action.payload,
                isError: true,
            };
        default:
            return state;
    }
};

function AddCollection() {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);
    const coverImageRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dataCoin, setDataCoin] = useState<any>([]);
    const [coverImageValue, setCoverImageValue] = useState<string>('');
    console.log('dataCoin',dataCoin)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4003/coin/img/', {
                    headers: {
                        token: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : null}`
                    },
                    method: 'GET'
                }).then((res) => {
                    return res;
                });
                const dataCoin = await response.data;
                if (dataCoin) {
                    setDataCoin(dataCoin.data);
                }
                return dataCoin;
            } catch (error) {
                console.error(error);
            }
        };
        fetchData().catch((e) => {
            console.error('Loi: ', e);
        });
    }, []);

    const handleNameCollectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'setNameCollection',
            payload: event.target.value,
        });
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'setTitle',
            payload: event.target.value,
        });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files && event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                dispatch({
                    type: 'setImage',
                    payload: reader.result as string,
                });
            };

            reader.readAsDataURL(file);
        }
    };

    const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const coverImageArray = event.target.value.split(',');
        dispatch({
            type: 'setCoverImage',
            payload: coverImageArray,
        });
        setCoverImageValue(event.target.value);
    };

    const handleUpdate = async (e) => {
        const { nameCollection, title, image, coverImage } = state;

        if (
            !nameCollection.trim() ||
            !title.trim() ||
            coverImage.length === 0 ||
            !image.trim()
        ) {
            dispatch({
                type: 'setError',
                payload: 'Please fill in all fields',
            });
            return;
        }

        try {
            e.preventDefault();
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch({
                    type: 'error',
                    payload: 'User token not found',
                });
                toast.error('User token not found');
                return;
            }

            const decodedToken = jwt.decode(token);
            const userId = decodedToken?.idUser;
            const formData = new FormData();
            formData.append('nameCollection', nameCollection);
            formData.append('title', title);
            formData.append('image', image);
            formData.append('coverImage', coverImage);
            console.log('userId',userId)
            const response =  await axios.post(
                `http://localhost:4003/collections/createIMG/${userId}`,formData,
                {
                    headers: {
                        token: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : null}`
                    },
                    method: 'POST'
                }
            );
            console.log('response',response)
            router.push(routes.profile);
            // Handle successful update here
            toast.success('Collection updated successfully');
            // Optionally, you can reset the form after successful update
            dispatch({ type: 'setNameCollection', payload: '' });
            dispatch({ type: 'setTitle', payload: '' });
            dispatch({ type: 'setImage', payload: '' });
            dispatch({ type: 'setCoverImage', payload: [] });
            dispatch({ type: 'error', payload: '' });
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'error',
                payload: 'Failed to update collection',
            });
            toast.error('Failed to update collection');
        }
    };

    return (
        <RootLayout>
            <form className="flex flex-wrap w-600 mx-auto flex justify-center" noValidate autoComplete="off">
                <Card className="mt-10">
                    <CardHeader className="text-center bg-gray-900 text-white" title="Thêm mới thẻ Collection" />
                    <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                style={{ marginBottom: '1rem' }}
                                fullWidth
                                id="nameCollection"
                                label="Tên bộ sưu tập"
                                placeholder="Tên bộ sưu tập"
                                value={state.nameCollection}
                                onChange={handleNameCollectionChange}
                            />
                            <TextField
                                style={{ marginBottom: '1rem' }}
                                fullWidth
                                id="coverImage"
                                label="coverImage"
                                placeholder="coverImage"
                                value={coverImageValue}
                                onChange={handleCoverImageChange}
                                select
                                inputRef={coverImageRef}
                            >
                                {dataCoin.map((coin: any) => (
                                    <MenuItem key={coin.full_name} value={coin.full_name}>
                                        {coin.full_name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                style={{ marginBottom: '1rem' }}
                                fullWidth
                                id="title"
                                label="Tiêu đề"
                                placeholder="Tiêu đề"
                                value={state.title}
                                onChange={handleTitleChange}
                            />
                            <input
                                type="file"
                                className="form-control mb-1"
                                id="image"
                                ref={fileInputRef}
                                placeholder="URL ảnh bìa"
                                onChange={handleImageChange}
                            />
                            <label>Tải ảnh bìa</label>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="large" className="flex-grow" onClick={handleUpdate}>
                            Lưu
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </RootLayout>
    );

}
export default AddCollection;