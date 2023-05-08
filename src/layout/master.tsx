import { PropsWithChildren, useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import { isNil } from 'lodash';
import { MappingAlgorithm } from 'antd/es/config-provider/context';
import styles from './master.module.css';
import { useLanguage } from '@/context/Language';
import { useTheme, defaultThemeConfig } from '@/reducer/Theme';

const MasterLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const { lang } = useLanguage();
    const themeContext = useTheme();
    console.log('theme', theme);

    const [antdThemes, setAntdThemes] = useState<MappingAlgorithm[]>([theme.defaultAlgorithm]);
    let themeMode = defaultThemeConfig.mode;

    if (!isNil(themeContext)) {
        themeMode = themeContext.state.mode;
    }

    useEffect(() => {
        setAntdThemes(() =>
            themeMode === 'dark' ? [theme.darkAlgorithm] : [theme.defaultAlgorithm],
        );
    }, [themeMode]);

    console.log('lang: ', lang);
    console.log('themeContext: ', themeContext);

    return (
        <ConfigProvider
            locale={lang.data}
            theme={{
                algorithm: antdThemes,
                components: {
                    Layout: {
                        colorBgBody: '',
                    },
                },
            }}
        >
            <div className={styles.masterLayout}>{children}</div>
        </ConfigProvider>
    );
};

export default MasterLayout;
