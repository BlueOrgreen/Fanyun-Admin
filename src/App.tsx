import { useState } from 'react';
import { Lang, useLanguage, langs } from '@/context/Language';
import { Button } from 'antd';
import { Theme, ThemeConfig } from '@/reducer/Theme';
import MasterLayout from '@/layout/master';

function App() {
    const { lang, setLang } = useLanguage();
    console.log(lang, useLanguage());

    return (
        <Lang>
            <Theme>
                <MasterLayout>
                    <div className="tw-bg-blue-500">App</div>
                    <Button
                        className="tw-bg-blue-500"
                        onClick={() => {
                            console.log(langs[1]);
                            setLang(langs[1]);
                        }}
                    >
                        英文
                    </Button>
                    <Button
                        className="tw-font-standard"
                        onClick={() => {
                            console.log(langs[0]);
                            setLang(langs[0]);
                        }}
                    >
                        中文
                    </Button>
                    <ThemeConfig />
                </MasterLayout>
            </Theme>
        </Lang>
    );
}

export default App;
