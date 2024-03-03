import { UserProps } from './data';

export interface UserContextProps {
  user: UserProps;
  handleUser: (user: UserProps) => void;
  handleLogout: () => void;
}
