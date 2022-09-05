import React from 'react'
import { useTranslation } from 'react-i18next';
import "./termsandConditions.css"

export default function TermsandConditions() {
  const { t, i18n } = useTranslation();
  return (
    <div className='termspage'>
      <div className="termsandconditions">
        <h1>{t("about_us.terms_and_conditions")}</h1>
        <p>jbauoggvousdbbviougouvghojvb9uhfouewbvpipdsishv[WOEWJGPIRBHJNAJIEIRKV[JRBOIHKVNOSHKDSNFKDSHONVLXNVJXHVLNCV</p>
      </div>
    </div>
  )
}
