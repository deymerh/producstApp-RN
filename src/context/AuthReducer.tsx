import { Usuario } from '../interfaces/appInterfaces';

export interface AuthState {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'autenticated' | 'noAutenticated';
}

type AuthAction =
  | { type: 'singUp', payload: { token: string, user: Usuario } }
  | { type: 'addError', payload: string }
  | { type: 'removeError' }
  | { type: 'noAutenticated' }
  | { type: 'logout' }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        user: null,
        status: 'noAutenticated',
        token: null,
        errorMessage: action.payload
      }
    case 'removeError':
      return {
        ...state,
        errorMessage: ''
      }
    case 'singUp':
      return {
        ...state,
        errorMessage: '',
        status: 'autenticated',
        token: action.payload.token,
        user: action.payload.user
      }
    case 'logout':
    case 'noAutenticated':
      return {
        ...state,
        status: 'noAutenticated',
        token: null,
        user: null
      }
    default:
      return state;
  }
}