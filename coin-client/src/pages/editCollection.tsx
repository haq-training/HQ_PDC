import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import RootLayout from '@/layouts/_root-layout';
import EditCollectionForm from '@/components/nft/editCollectionForm';

export default function EditCollection() {

    const router = useRouter();
    const { idUser, idCollection} = router.query;

    const [dataId, setDataId] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4003/collections/${idUser}/${idCollection}`, {
                    headers: {
                        token: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : null}`
                    },
                    method: 'GET'
                }).then((res) => {
                    return res;
                });
                const dataCollectionId = await response.data;
                if (dataCollectionId) {
                    setDataId(dataCollectionId.data);
                }
                return dataCollectionId;
            } catch (error) {
                console.error(error);
            }
        };
        fetchData().catch((e) => {
            console.error('Loi: ', e);
        });
    }, [idCollection]);


    return (
        <RootLayout>
            <div className="flex flex-wrap w-400 mx-auto justify-center" noValidate autoComplete="off">
                <EditCollectionForm item={dataId} idCollection={idCollection} idUser={idUser}  />
            </div>
        </RootLayout>
    );
};
