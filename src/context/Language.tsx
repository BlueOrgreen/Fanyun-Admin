import React, { useState, FC, PropsWithChildren, createContext, useContext } from 'react';
import { Locale } from 'antd/es/locale';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';

interface LangType {
    name: string;
    label: string;
    data: Locale;
}

export const langs: LangType[] = [
    {
        name: 'zh_CN',
        label: '🇨🇳 简体中文',
        data: zhCN,
    },
    {
        name: 'en_US',
        label: '🇺🇸 english(US)',
        data: enUS,
    },
];

type LangState = {
    lang: LangType;
    setLang: (lang: LangType) => void;
};

export const LangContext = createContext<LangState>({
    lang: langs[0],
    setLang: (lang: LangType) => {},
});

const LangProvider: FC<LangState & PropsWithChildren> = ({ lang, setLang, children }) => {
    return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
};

export const Lang: FC<PropsWithChildren> = ({ children }) => {
    const [lang, setLang] = useState<LangType>(langs[0]);

    return (
        <LangProvider lang={lang} setLang={setLang}>
            {children}
        </LangProvider>
    );
};

export const useLanguage = () => {
    const context = useContext(LangContext);
    if (!context) {
        throw new Error('useLanguage必须在LangProvider中使用');
    }
    return context;
};
