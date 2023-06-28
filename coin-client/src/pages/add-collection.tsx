import React, { useReducer,useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@/components/ui/button';
// import httpClient from '@/data/utils/client';

type State = {
    nameCollection: string;
    slug: string;
    title: string;
    coverImage: File | null;
    image: File | null;
    number_of_artwork: number;
    avatar: File | null;
    userName: string;
    userSlug: string;
    isButtonDisabled: boolean;
    helperText: string;
    isError: boolean;
};

const initialState: State = {
    nameCollection: '',
    slug: '',
    title: '',
    coverImage: null,
    image: null,
    number_of_artwork: 0,
    avatar: null,
    userName: '',
    userSlug: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false,
};

type Action =
    | { type: 'setNameCollection'; payload: string }
    | { type: 'setSlug'; payload: string }
    | { type: 'setTitle'; payload: string }
    | { type: 'setCoverImage'; payload: File | null }
    | { type: 'setImage'; payload: File | null }
    | { type: 'setNumberOfArtwork'; payload: number }
    | { type: 'setAvatar'; payload: File | null }
    | { type: 'setUserName'; payload: string }
    | { type: 'setUserSlug'; payload: string }
    | { type: 'setIsButtonDisabled'; payload: boolean }
    | { type: 'updateSuccess'; payload: string }
    | { type: 'updateFailed'; payload: string }
    | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setNameCollection':
            return {
                ...state,
                nameCollection: action.payload,
            };
        case 'setSlug':
            return {
                ...state,
                slug: action.payload,
            };
        case 'setTitle':
            return {
                ...state,
                title: action.payload,
            };
        case 'setCoverImage':
            return {
                ...state,
                coverImage: action.payload,
            };
        case 'setImage':
            return {
                ...state,
                image: action.payload,
            };
        case 'setNumberOfArtwork':
            return {
                ...state,
                number_of_artwork: action.payload,
            };
        case 'setAvatar':
            return {
                ...state,
                avatar: action.payload,
            };
        case 'setUserName':
            return {
                ...state,
                userName: action.payload,
            };
        case 'setUserSlug':
            return {
                ...state,
                userSlug: action.payload,
            };
        case 'setIsButtonDisabled':
            return {
                ...state,
                isButtonDisabled: action.payload,
            };
        case 'updateSuccess':
            return {
                ...state,
                helperText: action.payload,
                isError: false,
            };
        case 'updateFailed':
            return {
                ...state,
                helperText: action.payload,
                isError: true,
            };
        case 'setIsError':
            return {
                ...state,
                isError: action.payload,
            };

        default:
            return state;
    }
};

function AddCollection() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleNameCollectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'setNameCollection',
            payload: event.target.value,
        });
    };

    const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'setSlug',
            payload: event.target.value,
        });
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'setTitle',
            payload: event.target.value,
        });
    };

    const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            dispatch({
                type: 'setCoverImage',
                payload: file,
            });
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            dispatch({
                type: 'setImage',
                payload: file,
            });
        }
    };

    const handleNumberOfArtworkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'setNumberOfArtwork',
            payload: Number(event.target.value),
        });
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            dispatch({
                type: 'setAvatar',
                payload: file,
            });
        }
    };

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'setUserName',
            payload: event.target.value,
        });
    };

    const handleUserSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'setUserSlug',
            payload: event.target.value,
        });
    };

    const handleUpdate = async () => {
        // Perform validation and update logic here
    };

    return (
        <form className="flex flex-wrap w-400 mx-auto justify-center" noValidate autoComplete="off">
            <Card className="mt-10">
                <CardHeader className="text-center bg-gray-900 text-white" title="Thêm mới thẻ Collection"/>
                <CardContent>
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            id="nameCollection"
                            placeholder="Tên bộ sưu tập"
                            value={state.nameCollection}
                            onChange={handleNameCollectionChange}
                        />
                        <input
                            type="text"
                            className="form-control"
                            id="slug"
                            placeholder="Slug"
                            value={state.slug}
                            onChange={handleSlugChange}
                        />
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="Tiêu đề"
                            value={state.title}
                            onChange={handleTitleChange}
                        />
                        <input
                            type="text"
                            className="form-control"
                            id="coverImage"
                            placeholder="URL ảnh bìa"
                            value={state.coverImage}
                            onChange={handleCoverImageChange}
                        />
                        <input
                            type="text"
                            className="form-control"
                            id="image"
                            placeholder="URL ảnh"
                            value={state.image}
                            onChange={handleImageChange}
                        />
                        <input
                            type="number"
                            className="form-control"
                            id="numberOfArtwork"
                            placeholder="Số tác phẩm"
                            value={state.number_of_artwork}
                            onChange={handleNumberOfArtworkChange}
                        />
                        <input
                            type="text"
                            className="form-control"
                            id="avatar"
                            placeholder="URL ảnh đại diện"
                            value={state.avatar}
                            onChange={handleAvatarChange}
                        />
                        <input
                            type="text"
                            className="form-control"
                            id="userName"
                            placeholder="Tên người dùng"
                            value={state.userName}
                            onChange={handleUserNameChange}
                        />
                        <input
                            type="text"
                            className="form-control"
                            id="userSlug"
                            placeholder="Slug người dùng"
                            value={state.userSlug}
                            onChange={handleUserSlugChange}
                        />
                        {state.isError && (
                            <p className="text-red-500">{state.helperText}</p>
                        )}
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        size="large"
                        className="flex-grow"
                        onClick={handleUpdate}
                        disabled={state.isButtonDisabled}
                    >
                        Lưu
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}
export default AddCollection;