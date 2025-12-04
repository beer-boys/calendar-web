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

  useEffect(() => {
    if (currentUser) {
      return;
    }

    // @ts-expect-error
    dispatch(fetchCurrentUser());
  }, [dispatch, currentUser]);

  const navigate = useNavigate();
  const error = useSelector(getUserError);
  useEffect(() => {
    if (!error) {
      return;
    }

    navigate('/login');
  }, [navigate, error]);

  const isLoading = useSelector(getUserIsLoading);
  const context = { isLoading };

  return <Outlet context={context} />;
}
