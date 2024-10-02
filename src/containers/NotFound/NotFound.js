import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openMenuItem } from 'store/actions/uiActions';

export const NotFound = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openMenuItem('dashboard'));
    navigate('/dashboard');
  }, []);

  return <></>;
};
