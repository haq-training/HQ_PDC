import jwt from 'jsonwebtoken';
import Profile from '@/components/profile/profile';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ProfileDefaultAvarta from '@/components/profile/profile-default-avarta';
import ProfileDefaultCover from '@/components/profile/profile-default-cover';

export default function ProfileDefault(){

    const [dataUser , setDataUser] = useState([]);
    const data = React.useMemo(() => dataUser, [dataUser]);

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
  return(
      <>
            <ProfileDefaultCover item={data}/>
          <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
              <ProfileDefaultAvarta item={data}/>
              <Profile />
          </div>
      </>
  );
}