# Locales

## What's in here?

The **locales** folder contains all translations, for differents languages, used by the app.

## How it works

Since **i18next** performs a new request for each translation file, translations for the same language cannot be split into multiple files to improve organization, otherwise multiple requests will have to be done. To work around this limitation, a custom bundler was created to merge multiple translation files into a single one.

To add translations follow the following steps:

- Create a folder with the locale code for each required language. These folders will act as a fallback in case you have to support multiple language cultures.

```
 locales -> en
         -> pt
```

- If you need translations for different cultures of a language also add them.

  ```
  locales -> en    (should contain translations in common between en-GB and en-US)
          -> en-GB (should contain en-GB specific translations not in the en folder)
          -> en-US (should contain en-US specific translations not in the en folder)
          -> pt
          -> pt-PT
          -> pt-BR
  ```

- Then inside each locale folder add as many translation files as needed to promote a good organization

  ```
  en    -> common.json
        -> errors.json
        -> feature1.json

  en-GB -> feature1.json
        -> feature2.json
  ```

- The custom bundler will create a single translation file with an object where the keys match the file names

```
  en    -> translation.json
  en-GB -> translation.json
```

```json
  en -> translation.json

  {
    "common": {
      "key1": "Key 1",
      "key2": "Key 2"
    },
    "errors": {},
    "feature1": {}
  }
```

- To use a translation in your code simply use it as if it was already bundled.

```js
export function Component() {
  const { t } = useTranslation();

  return <div>{t('common.key1')}</div>;
}
```
