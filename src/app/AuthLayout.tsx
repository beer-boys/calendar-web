import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { fetchCurrentUser } from '@/modules/user/user.reducer';
import { getCurrentUser, getUserError, getUserIsLoading } from '@/modules/user/user.selectors';

export interface AuthLayoutOutletContext {
  isLoading: boolean;
}

export function AuthLayout() {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const isLoading = useSelector(getUserIsLoading);

  useEffect(() => {
    if (currentUser || isLoading) {
      return;
    }

    // @ts-expect-error Редакс сам не хочет дружить со своими типами
    dispatch(fetchCurrentUser());
  }, [dispatch, currentUser, isLoading]);

  const navigate = useNavigate();
  const error = useSelector(getUserError);
  useEffect(() => {
    if (!error) {
      return;
    }

    navigate('/login');
  }, [navigate, error]);

  const context = { isLoading };

  return <Outlet context={context} />;
}
