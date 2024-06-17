import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PodcastCard from '../Components/PodcastCard';
import { getUsers } from '../api/index';

const Container = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
height: 100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 20px;
`
const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FavouritesContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap: 14px;
padding: 18px 6px;
@media (max-width: 550px){
  justify-content: center;
}
`

const Loader = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`

const DisplayNo = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
color: ${({ theme }) => theme.text_primary};
`


const Favourites = () => {
  // const [user, setUser] = useState();
  const [Loading, setLoading] = useState(false);
  const { userFav } = useSelector(state => state.fav);
  // const { currentUser } = useSelector(state => state.user);

  const token = localStorage.getItem("podstreamtoken");
  const getUser = async () => {
    await getUsers(token).then((res) => {
      // setUser(res.data)
    }).then((error) => {
      console.log(error)
    });
  }

  const getuser = async () => {

    // if (currentUser) {
    //   setLoading(true);
    //   await getUser();
    //   setLoading(false);
    // }
    // setUser(JSON.parse(localStorage.getItem('user')))
  }

  useEffect(() => {
    // getuser();
    console.log(userFav,'user');
  }, []);

  return (
    <Container>
      <Topic>
        Favourites
      </Topic>
      {Loading ?
        <Loader>
          <CircularProgress />
        </Loader>
        :
        <FavouritesContainer>
          {userFav?.favorites?.length === 0 && <DisplayNo>No Favourites</DisplayNo>}
          {userFav && userFav?.favorites.map((podcast) => (
            <PodcastCard podcast={podcast} user={userFav} />
          ))}
        </FavouritesContainer>
      }
    </Container>
  )
}

export default Favourites;