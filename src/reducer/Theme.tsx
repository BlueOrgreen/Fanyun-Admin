import React, {
    FC,
    useContext,
    Dispatch,
    createContext,
    PropsWithChildren,
    Reducer,
    useReducer,
    useEffect,
} from 'react';
import { produce } from 'immer';
import { isNil } from 'lodash';
import { Switch } from 'antd';

export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark',
}

export type ThemeState = {
    mode: `${ThemeMode}`;
};

export enum ThemeActionType {
    CHANGE_MODE = 'change_mode',
}

export type ThemeAction = { type: `${ThemeActionType.CHANGE_MODE}`; value: `${ThemeMode}` };

export type ThemeContextType = {
    state: ThemeState;
    dispatch: Dispatch<ThemeAction>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const defaultThemeConfig: ThemeState = {
    mode: 'light',
};

export const ThemeReducer: Reducer<ThemeState, ThemeAction> = produce((draft, action) => {
    switch (action.type) {
        case 'change_mode':
            draft.mode = action.value;
            break;
        default:
            break;
    }
});

export const Theme: React.FC<{ data?: ThemeState } & PropsWithChildren> = ({
    data = {},
    children,
}) => {
    const [state, dispatch] = useReducer(ThemeReducer, data, (initData) => ({
        ...defaultThemeConfig,
        ...initData,
    }));

    useEffect(() => {
        if (state.mode === 'dark') {
            document.documentElement.setAttribute('data-theme', 'tw-dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }, [state.mode]);

    return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>;
};

export const ThemeConfig: FC = () => {
    const context = useContext(ThemeContext);
    if (isNil(context)) return null;
    const { state, dispatch } = context;
    const toggleMode = () =>
        dispatch({ type: 'change_mode', value: state.mode === 'light' ? 'dark' : 'light' });
    return (
        <>
            <Switch
                checkedChildren="🌛"
                unCheckedChildren="☀️"
                onChange={toggleMode}
                checked={state.mode === 'dark'}
                defaultChecked={state.mode === 'dark'}
            />
        </>
    );
};

export const useTheme = () => {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error('useTheme必须在ThemeProvider中使用');
    }
    return themeContext;
};
