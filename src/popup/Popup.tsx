import React, { ReactElement, useEffect, useState } from 'react';
import { getBucket } from '@extend-chrome/storage';
import { Container, Select } from '@mantine/core';

interface LangBucket {
  selectedLang: string;
}

const bucket = getBucket<LangBucket>('lang_bucket', 'sync');

const Popup = (): ReactElement => {
  document.body.style.width = '20rem';
  document.body.style.height = '20rem';

  const [lang, setLang] = useState('EN');

  useEffect(() => {
    (async () => {
      const value = await bucket.get();
      value.selectedLang && setLang(value.selectedLang);
    })();
  }, []);

  const saveLang = (lang: string) => {
    bucket.set({ selectedLang: lang });
    setLang(lang);
  };

  return (
    <Container p="xl">
      <Select
        label="どの言語に翻訳しますか？"
        value={lang}
        onChange={(value: string) => saveLang(value)}
        data={[
          { value: 'EN', label: '英語' },
          { value: 'KO', label: '韓国語' },
          { value: 'ZH', label: '中国語' },
          { value: 'JA', label: '日本語' },
        ]}
      />
    </Container>
  );
};

export default Popup;
