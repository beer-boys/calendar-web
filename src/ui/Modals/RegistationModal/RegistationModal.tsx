import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { processTokens } from '@/api/api';
import { registerAPICall } from '@/api/calls/register';
import { closeModal, MODALS, openModal } from '@/modules/modal/modal.reducer';
import { setCurrentUser, setUserError } from '@/modules/user/user.reducer';
import type { User } from '@/modules/user/user.types';
import { Credentials } from '@/ui/Modals/RegistationModal/Credentials/Credentials';
import type { RegistrationData } from '@/ui/Modals/RegistationModal/RegistationModal.types';
import { emptyRegistrationData } from '@/ui/Modals/RegistationModal/RegistrationModal.constants';
import { UserInfo } from '@/ui/Modals/RegistationModal/UserInfo/UserInfo';

export function RegistationModal() {
  const [activeSection, setActiveSection] = useState<'credentials' | 'userInfo'>('credentials');
  const isCredentials = activeSection === 'credentials';
  const isUserInfo = activeSection === 'userInfo';
  const goToUserInfo = () => setActiveSection('userInfo');
  const goToCredentials = () => setActiveSection('credentials');

  const registrationData = useRef<RegistrationData>(emptyRegistrationData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const { data } = await registerAPICall(registrationData.current);

      processTokens(data);

      const user: User = {
        email: data.login,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        roles: data.roles,
      };

      dispatch(setCurrentUser({ user }));
      dispatch(setUserError({ error: '' }));
      dispatch(closeModal());
      navigate('/');
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onLogin = () => {
    dispatch(openModal({ modalId: MODALS.login }));
  };

  return (
    <>
      {isCredentials && <Credentials registrationData={registrationData} onSubmit={goToUserInfo} onCancel={onLogin} />}
      {isUserInfo && <UserInfo registrationData={registrationData} isLoading={isLoading} onSubmit={onSubmit} onCancel={goToCredentials} />}
    </>
  );
}
