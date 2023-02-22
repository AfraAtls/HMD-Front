import uiReducer, {
  UIState,
  toggleTheme,
  toggleForm,
  toggleDrawer,
  setValue,
  setGender,
} from '../../../features/UI/uiSlice';

describe('UI reducer test suites', () => {
  const initialState: UIState = {
    isDark: true,
    isRegistered: false,
    isDrawerOpen: false,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    gender: 'Homme',
  };

  it('should handle initial state', () => {
    expect(uiReducer(initialState, { type: 'unknown' })).toEqual({
      isDark: true,
      isRegistered: false,
      isDrawerOpen: false,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      gender: 'Homme',
    });
  });

  it('should handle toggle theme', () => {
    const actual = uiReducer(initialState, toggleTheme());
    expect(actual.isDark).toBe(false);
  });

  it('should handle toggle form', () => {
    const actual = uiReducer(initialState, toggleForm());
    expect(actual.isRegistered).toBe(true);
  });

  it('should handle toggle drawer', () => {
    const actual = uiReducer(initialState, toggleDrawer());
    expect(actual.isDrawerOpen).toBe(true);
  });

  it('should handle change event on first firstname textfield', () => {
    const newState = uiReducer(initialState, setValue({ value: 'john', name: 'firstname' }));
    const expectedState = { ...initialState, firstname: 'john' };
    expect(newState).toEqual(expectedState);
  });

  it('should handle change event on first name textfield', () => {
    const newState = uiReducer(initialState, setValue({ value: 'doe', name: 'name' }));
    const expectedState = { ...initialState, name: 'doe' };
    expect(newState).toEqual(expectedState);
  });

  it('should handle change event on first email textfield', () => {
    const newState = uiReducer(
      initialState,
      setValue({ value: 'john.doe@gmail.com', name: 'email' })
    );
    const expectedState = { ...initialState, email: 'john.doe@gmail.com' };
    expect(newState).toEqual(expectedState);
  });

  it('should handle change event on first password textfield', () => {
    const newState = uiReducer(
      initialState,
      setValue({ value: 'johnSecurePassword', name: 'password' })
    );
    const expectedState = { ...initialState, password: 'johnSecurePassword' };
    expect(newState).toEqual(expectedState);
  });
});
